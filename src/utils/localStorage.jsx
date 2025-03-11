const employees = [
  {
    id: 1,
    firstName: "Shruti",
    email: "shruti@.com",
    password: "1234",
    tasks: [],
  },
  {
    id: 2,
    firstName: "Priti",
    email: "priti@.com",
    password: "1234",
    tasks: [],
  },
  {
    id: 3,
    firstName: "Sandesh",
    email: "sandesh@.com",
    password: "1234",
    tasks: [],
  },
  {
    id: 4,
    firstName: "Akash",
    email: "akash@.com",
    password: "1234",
    tasks: [],
  },
  {
    id: 5,
    firstName: "Ankit",
    email: "ankit@.com",
    password: "1234",
    tasks: [],
  },
 
];

const admin = [
  {
    id: 1,
    email: "admin@.com",
    password: "123",
  },
];


// LocalStorage Utility Functions
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = () => {
  return {
    employees: JSON.parse(localStorage.getItem("employees")) || [],  // Employee data
    admin: JSON.parse(localStorage.getItem("admin")) || [],  // Admin data
  };
};

