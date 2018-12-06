import React from "react";
import { Link } from "react-router-dom";

export const DaftarStaffRow = props => {
  return (
    <tbody>
      {props.listStaff.map(staff => {
        return (
          <tr key={staff.id}>
            <td>{staff.nama}</td>
          </tr>
        );
      })}
    </tbody>
  );
};