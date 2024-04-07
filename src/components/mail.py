import os
import requests
import time
import re
from xml.etree import ElementTree as ET
import win32com.client as win32

# Configuration with API Endpoints for each subfolder
API_ENDPOINTS = {
    'BL': 'http://10.240.21.135:9094/BL/bl-loan-api/decision',
    'CD': 'http://10.240.21.135:9094/CD_Service/cd-loan-api/decision',
    'CPV': 'http://10.240.21.135:9094/cpv/cpv-loan-api/decision'
}
SOURCE_SUBFOLDERS = ['BL', 'CD', 'CPV']
BASE_DIR = os.getcwd()  # Current working directory
api_status = {}  # To accumulate API call results

def parse_xml(file_path):
    """Parse XML file and return XML tree."""
    try:
        with open(file_path, 'r', encoding='utf-8-sig') as file:
            content = file.read()
            return ET.fromstring(content)
    except ET.ParseError as e:
        error_message = f"Failed to parse XML file at {file_path}: {e}"
        print(error_message)
        return None

def get_next_response_number(folder_path):
    """Find the next response file number to avoid filename collision."""
    response_files = [f for f in os.listdir(folder_path) if f.startswith('response') and f.endswith('.xml')]
    max_number = 0
    for filename in response_files:
        match = re.search(r'response(\d+)\.xml', filename)
        if match:
            max_number = max(max_number, int(match.group(1)))
    return max_number + 1

def process_folder(subfolder):
    """Process each XML file in the specified subfolder, make API request, and handle responses."""
    subfolder_path = os.path.join(BASE_DIR, subfolder)
    os.makedirs(subfolder_path, exist_ok=True)

    for file_name in os.listdir(subfolder_path):
        if file_name.endswith('.xml') and 'req' in file_name.lower():
            file_path = os.path.join(subfolder_path, file_name)
            print(f"Processing file: {file_name} using API endpoint: {API_ENDPOINTS[subfolder]}")
            xml_tree = parse_xml(file_path)
            
            if xml_tree is not None:
                response = requests.post(API_ENDPOINTS[subfolder], data=ET.tostring(xml_tree), headers={'Content-Type': 'application/xml'})

                if subfolder not in api_status:
                    api_status[subfolder] = {'endpoint': API_ENDPOINTS[subfolder], 'status_codes': []}
                api_status[subfolder]['status_codes'].append(str(response.status_code))

def send_summary_email():
    """Send summary email with an HTML table of API statuses."""
    body = """
    <html>
    <head>
    <style>
      table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
      }
      th, td {
        padding: 5px;
        text-align: left;
      }
    </style>
    </head>
    <body>
    <p>Hi,</p>
    <p>These are the statuses of the following projects' APIs. Please go through the below table for more details:</p>
    <table>
      <tr>
        <th>API NAME</th>
        <th>API ENDPOINT</th>
        <th>STATUS CODE</th>
      </tr>
    """

    for api_name, details in api_status.items():
        status_codes = ", ".join(details['status_codes'])
        body += f"""
          <tr>
            <td>{api_name}</td>
            <td>{details['endpoint']}</td>
            <td>{status_codes}</td>
          </tr>
        """
    
    body += """
    </table>
    </body>
    </html>
    """

    recipients = ["kirankumar.godisela@kotak.com", "buchagari.chaitanyareddy@kotak.com", "ranjith.kunduru@kotak.com"]
    outlook = win32.Dispatch('outlook.application')
    mail = outlook.CreateItem(0)
    mail.Subject = "API Processing Summary"
    mail.HTMLBody = body
    for recipient in recipients:
        mail.Recipients.Add(recipient)
    mail.Send()
    print("Summary email sent with HTML table.")

def main():
    """Main function to initiate processing loop."""
    start_time = time.time()
    while True:
        print("Starting process...")
        global api_status
        api_status = {}  # Reset the status accumulator
        for subfolder in SOURCE_SUBFOLDERS:
            process_folder(subfolder)
        
        send_summary_email()  # Send a summary email
        
        elapsed_time = time.time() - start_time
        if elapsed_time < 300:  # If less than 5 minutes have elapsed
            time_to_wait = 300 - elapsed_time
            print(f"Process completed. Waiting for {time_to_wait} seconds...")
            time.sleep(time_to_wait)  # Wait for the remainder of the 5-minute period
        start_time = time.time()  # Reset the start time for the next cycle

if __name__ == "__main__":
    main()
