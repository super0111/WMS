import config from "../config";

const slotCreate = (slot, history) => {
  return fetch(`${config.server_url}dashboard/slot/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...slot, // Use your own property name / key
    }),
  })
  .then((res) =>{
    return res;
  } );
};

const slotUpdate = (slot, history) => {
  return fetch(`${config.server_url}dashboard/slot/updatebySerial`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...slot, // Use your own property name / key
    }),
  })
  .then((res) =>{
    return res.json();
  } );
};

/* eslint-disable camelcase */

const slotDelete = (slot_serial, history) => {
  return fetch(`${config.server_url}dashboard/slot/deleteBySerial`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      slot_serial, // Use your own property name / key
    }),
  })
  .then((res) =>{
    return res.json();
  } );
};

export { slotCreate, slotUpdate, slotDelete };