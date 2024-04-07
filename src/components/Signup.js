import React, { useState } from 'react';
//import { auth, googleAuthProvider } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
//import { signInWithPopup } from 'firebase/auth';
import '../components/styles/signupsolar.css';
import '../components/styles/signup.scss';
import debounce from 'lodash.debounce';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const Solarsignup = () => {
  const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setfullname] = useState('');
    const [email, setEmail] = useState('');
    const [timeofbirth, settimeofbirth] = useState('');
    const [placeofbirth, setplaceofbirth] = useState('');
    const [dateofbirth, setdateofbirth] = useState('');
    const [address, setaddress] = useState('');

    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const [value, setValue] = useState('');


  

    // Define the debounced function outside of the `useCallback`
    const debouncedCheckUsernameAvailability = debounce(async (username) => {
      try {
        const response = await fetch(`http://localhost:5000/api/username?username=${encodeURIComponent(username)}`);
        const data = await response.json();
        setUsernameAvailable(data.isAvailable);
      } catch (error) {
        console.error("Error checking username availability", error);
      }
    }, 300);
    

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    debouncedCheckUsernameAvailability(newUsername);
  };


  const handleRegister = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password,fullname, email,dateofbirth,timeofbirth,placeofbirth, mobile: value, address }),
        });
        const data = await response.json();
        console.log('Submitting time of birth:', timeofbirth);

        if (data.success) {
          sessionStorage.setItem('username', username);
            navigate('/homeheader');  // Redirecting to the same page as successful login
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error during registration", error);
        alert('Registration failed: ' + error.message);
    }
};

  return (
    <section className="clearfix">
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleRegister}>
                <h2>Registration Form</h2>
                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" id="fullname" value={fullname} onChange={e => setfullname(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                <label htmlFor="user">User Name</label>
    <input
        type="text"
        id="user"
        name="username"  // It's good to have a name attribute for form data handling
        value={username}
        onChange={handleUsernameChange}
        required
        aria-describedby="usernameHelp"  // Assistive technologies use
    />
    {username && (  // Only show feedback if username has been typed
        usernameAvailable ?
        <p id="usernameHelp" className="username-check available">Username available</p> :
        <p id="usernameHelp" className="username-check not-available">Username not available</p>
    )}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="dateofbirth">Date Of Birth</label>
                    <input type="date" id="dateofbirth" value={dateofbirth} onChange={e => setdateofbirth(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="timeofbirth">Time Of Birth</label>
                    <input type="time" id="timeofbirth" value={timeofbirth} onChange={e => settimeofbirth(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="placeofbirth">Place Of Birth</label>
                    <input type="text" id="placeofbirth" value={placeofbirth} onChange={e => setplaceofbirth(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <PhoneInput
                    international
                    defaultCountry="US"
                    value={value}
                    onChange={setValue} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="address" id="address" value={address} onChange={e => setaddress(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
                <button type="button" onClick={() => navigate('/login')}>Login</button>
            </form>
        </div>
      <ul className="solarsystem">
        <li className="sun"><a href="#sun"><span>Sun</span></a></li>
        <li className="mercury"><a href="#mercury"><span>Mercury</span></a></li>
        <li className="venus"><a href="#venus"><span>Venus</span></a></li>
        <li className="earth"><a href="#earth"><span>Earth<span className="moon"> &amp; Moon</span></span></a></li>
        <li className="mars"><a href="#mars"><span>Mars</span></a></li>
        <li className="asteroids_meteorids"><span>Asteroids &amp; Meteorids</span></li>
        <li className="jupiter"><a href="#jupiter"><span>Jupiter</span></a></li>
        <li className="saturn"><a href="#saturn"><span>Saturn &amp; <span className="ring">Ring</span></span></a></li>
        <li className="uranus"><a href="#uranus"><span>Uranus</span></a></li>
        <li className="neptune"><a href="#neptune"><span>Neptune</span></a></li>
        <li className="pluto"><a href="#pluto"><span>Pluto</span></a></li>
      </ul>

      <ul id="descriptions">

      <li>
    <h2 id="Sun">Sun</h2>
    <p>The Sun is a star, a hot ball of glowing gases at the heart of our solar system. Its influence extends far beyond the orbits of distant Neptune and Pluto. Without the Sun's intense energy and heat, there would be no life on Earth. And though it is special to us, there are billions of stars like our Sun scattered across the Milky Way galaxy.</p>
  </li>
  <li>
    <h2 id="Mercury">Mercury</h2>
    <p>Mercury is the closest planet to the Sun and due to its proximity, it is not easily seen except during twilight. For every two orbits of the Sun, Mercury completes three rotations about its axis and up until 1965 it was thought to be the same as Earth's moon, locked to rotate in a way that was synchronous with its orbit.</p>
  </li>
  <li>
    <h2 id="Venus">Venus</h2>
    <p>Venus is the second planet from the Sun and is Earth's closest planetary neighbor. It's one of the most beautiful objects in the sky and is also known as the morning star and the evening star. But, it’s not as hospitable as it appears. It’s a desert world with a carbon dioxide atmosphere 90 times as thick as ours and surface temperatures that reach 471 °C.</p>
  </li>
      <li>
    <h2 id="Earth">Earth</h2>
    <p>Our home, Earth, is the third planet from the Sun and the only world known to support an atmosphere with free oxygen, oceans of water on its surface, and, the big one, life. Earth is the perfect place for life as we know it.</p>
  </li>
 
  <li>
    <h2 id="mars">Mars</h2>
    <p>Mars is the fourth planet from the Sun. A dusty, cold, desert world with a very thin atmosphere, Mars is one of the most explored bodies in our solar system. It's a rocky planet, known as the Red Planet because of its reddish appearance.</p>
  </li>
  <li>
    <h2 id="jupiter">Jupiter</h2>
    <p>Jupiter is the largest planet in our solar system, and is known for its many moons, its dangerous radiation belts and its iconic Great Red Spot. A giant planet, Jupiter's diameter is about 11 times that of Earth and it’s made mostly of hydrogen and helium.</p>
  </li>
  <li>
    <h2 id="saturn">Saturn</h2>
    <p>Saturn is the sixth planet from the Sun and the second-largest in our solar system. Adorned with thousands of beautiful ringlets, Saturn is unique among the planets. Its rings are not solid; they are made up of bits of ice, dust and rock.</p>
  </li>
  <li>
    <h2 id="uranus">Uranus</h2>
    <p>Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus is similar in composition to Neptune, and both have different bulk chemical composition from that of the larger gas giants Jupiter and Saturn.</p>
  </li>
  <li>
    <h2 id="neptune">Neptune</h2>
    <p>Neptune is the eighth and farthest known planet from the Sun in the Solar System. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth, more massive than its near-twin Uranus.</p>
  </li>
  <li>
    <h2 id="pluto">Pluto</h2>
    <p>Pluto, which was once considered the ninth planet, is now classified as a dwarf planet. It is located in the Kuiper belt, a ring of bodies beyond Neptune. Pluto is more modest in size than originally thought, with a solid surface but a very thin atmosphere.</p>
  </li>
</ul>

    </section>
  );
};

export default Solarsignup;
