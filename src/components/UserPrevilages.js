import React from 'react';

function UserPrivileges() {
  return (
    <div className="userPrivileges">
      <h2>USER PRIVILEGES</h2>
      <div className="privilegeContainer">
        <div className="privilege">
          <p>Free User</p>
          <p>Limited time frame</p>
        </div>
        <div className="privilege">
          <p>Silver User</p>
          <p>Limited time frame</p>
        </div>
        <div className="privilege">
          <p>Gold User</p>
          <p>Limited time frame</p>
        </div>
      </div>
    </div>
  );
}

export default UserPrivileges;
