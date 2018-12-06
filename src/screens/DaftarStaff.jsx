import React from "react";
import { Loading } from "../components/Loading";
import { TableContainer } from "../containers/TableContainer";
import { Appointment } from "../utils/Appointment";
import { DaftarStaffRow } from "../components/DaftarStaffRow";

export class DaftarStaff extends React.Component {
  /**
   * TODO: Akses method getAllPasien() pada Appointment dan lakukan update state.
   * TODO: Lakukan pemanggilan pada constructor() atau pada lifecycle componentDidMount()
   */

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      listPasien: []
    };
  }
  
  componentDidMount() {
    Appointment.getAllStaff().then(response => {
      this.setState({
        loading: false,
        listStaff: response.result
      });
    });
  }

  render() {
    console.log("kena")
    if (this.state.loading) {
      return <Loading msg="Fetching Data..." />;
    } else {
      return (
        <TableContainer title="Daftar Staff Farmasi" header={["Nama Staff"]}>
          <DaftarStaffRow listStaff={this.state.listStaff} />
        </TableContainer>
      );
    }
  }
}