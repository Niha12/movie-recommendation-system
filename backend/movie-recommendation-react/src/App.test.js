import { render, screen } from '@testing-library/react';
import App from './App';
import {deleteUser, signin, signup} from './services/auth';


describe("Login", ()=>{
  it("should be true", ()=>{
    const foo = true;
    expect(foo).toBe(true);
  })
})

// User does not exist
test('sign in without an account', async () =>{
  let error = ""
  try{
    await signin("unit-testing@gmail.com", "dummyPassword");
  } catch(err){
    error = err.message;
  }

  // print(error)
  expect(error).toEqual("There is no user record corresponding to this identifier. The user may have been deleted.")

})

// User sign up with short password
test('sign up with short password', async () =>{
  let error = ""
  try{
    await signup("unit-testing@gmail.com", "dummy");
  } catch(err){
    error = err.message;
  }

  expect(error).toEqual("Password should be at least 6 characters")
})

// User sign up
test('sign up', async () =>{
  let error = ""
  try{
    await signup("unit-testing@gmail.com", "dummyPassword");
  } catch(err){
    error = err.message;
  }
  // Should produce no error
  expect(error).toEqual("")
})

// User sign up when an email already exists
test('sign up when email already exists', async () =>{
  let error = ""
  try{
    await signup("unit-testing@gmail.com", "dummyPassword1");
  } catch(err){
    error = err.message;
  }
  expect(error).toEqual("The email address is already in use by another account.")
})


// User sign in with wrong password
test('sign in with wrong password', async () =>{
  let error = ""
  try{
    await signin("unit-testing@gmail.com", "dummyPass");
  } catch(err){
    error = err.message;
  }

  expect(error).toEqual("The password is invalid or the user does not have a password.")
})

// User sign in
test('sign in with right password', async () =>{
  let error = ""
  try{
    await signin("unit-testing@gmail.com", "dummyPassword");
  } catch(err){
    error = err.message;
  }

  // Should have no error
  expect(error).toEqual("")
})

// Deletes User
test('delete user', async () =>{
  let error = ""
  try{
    await deleteUser();
  } catch(err){
    error = err.message;
  }

  expect(error).toEqual("")
})




