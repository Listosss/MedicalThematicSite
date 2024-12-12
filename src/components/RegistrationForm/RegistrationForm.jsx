import React, { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './RegistrationForm.css'

export function RegistrationForm() {
  const inputRef = useRef();
  useEffect(() => { if (inputRef.current) { inputRef.current.focus() } }, [])

  const {register, checkNameUniqueness} = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [role, setRole] = useState('');

  const [isUnique, setIsUnique] = useState(true);
  const typingTimeoutRef = useRef(null);

  const handleSubmit =(e)=>{
    e.preventDefault();
    if(!isUnique){
      alert('Please, enter a unique username')
      return;
    }
    if (!email || !username || !password || !month || !day || !year || !role) {
      alert('Please, fill all fields')
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email');
      return;
    }
    const userData = {email: email, name: username, password: password,date: {day: day, month: month, year: year}, 
    role: role, savedArticles:[], ratedArticles:[], avatar: "./assets/avatars/default_avatar.png"};
    register(userData);
  }
  const enteringUsername=(e)=>{
    const value = e.target.value;
    setUsername(value);

    if(typingTimeoutRef.current)
      clearTimeout(typingTimeoutRef.current)
    
    typingTimeoutRef.current = setTimeout(()=>{
      const unique = checkNameUniqueness(value);
      setIsUnique(unique);
    }, 500)
    
  }
  return (
    <div>
      <form className='registr_form'>
        <h1 className='registr_title'>Welcome to our community</h1>
        <input type='email' placeholder='Email' ref={inputRef} value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type='text' placeholder='Username' value={username} onChange={(e) => enteringUsername(e)}/>
        {!isUnique && <p className='register_mistake_txt'>Username already taken</p>}
        <input type='password' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
        <label>Date of birth</label>
        <div className='birthdate_wrapper'>
          <select id='birthmonth_select' value={month} onChange={e=> setMonth(e.target.value)}>
            <option disabled  value={''} hidden>Month</option>
            <option value={"Jan"}>January</option>
            <option value={"Feb"}>February</option>
            <option value={"March"}>March</option>
            <option value={"April"}>April</option>
            <option value={"May"}>May</option>
            <option value={"June"}>June</option>
            <option value={"July"}>July</option>
            <option value={"Aug"}>August</option>
            <option value={"Sep"}>September</option>
            <option value={"Oct"}>October</option>
            <option value={"Nov"}>November</option>
            <option value={"Dec"}>December</option>
          </select>
          <select value={day} onChange={e=> setDay(e.target.value)}>
            <option disabled hidden value={''}>Day</option>
            {Array.from({ length: 31 }).map((_, index) => <option key={'day' + index} value={index + 1}>{index + 1}</option>)}
          </select>
          <select value={year} onChange={e=> setYear(e.target.value)} id='birthyear_select'>
            <option  value={''} disabled hidden>Year</option>
            {Array.from({ length: 101 }).map((_, index) => <option key={'year' + index} value={2024 - index}>{2024 - index}</option>)}
          </select>
        </div>
        <label>Role</label>
        <select id="role_select" name="role"  value={role} onChange={e=> setRole(e.target.value)}>
          <option disabled  value={''} hidden>Role</option>
          <option value="student">Student</option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
          <option value="pharmacist">Pharmacist</option>
          <option value="guardian">Relative/Guardian</option>
          <option value="researcher">Researcher</option>
          <option value="consultant">Consultant</option>
        </select>
        <input type='submit' value={'Register'} onClick={handleSubmit}></input>
      </form>
    </div>
  )
}
