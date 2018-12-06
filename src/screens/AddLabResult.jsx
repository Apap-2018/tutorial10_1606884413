import React from "react";
import { Loading } from "../components/Loading";
import { Appointment } from "../utils/Appointment";
import { FormAddLabResult } from "../containers/FormAddLabResult";

export class AddLabResult extends React.Component {
  /**
   * TODO: Akses method getDetailPasien(idPasien) pada Appointment dan lakukan update state.
   * TODO: Lakukan pemanggilan pada constructor() atau pada lifecycle componentDidMount()
   */

  constructor(props) {
    console.log("kena")
    super(props);
    this.state = {
      loading: true,
      pasien: {}
    };
    Appointment.getDetailPasien(this.props.match.params.id).then(response => {
      if (response.status === 200) {
        this.setState({
          loading: false,
          pasien: response.result
        });
      } else {
        alert("Data Tidak Ditemukan");
        this.props.history.push("/all-pasien");
      }
    });
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const data = new FormData(e.target);
    const dataJson = {};

    data.forEach((val, key) => {
      if (val !== "") {
        let name = key.split(".");
        if (name.length > 1) {
          let last = name.pop();
          name.reduce((prev, next) => {
            return (prev[next] = prev[next] || {});
          }, dataJson)[last] = val;
        } else {
          dataJson[key] = val;
        }
      }
    });
    Appointment.addLabResult(dataJson).then(response => {
      console.log(dataJson);
      if (response.status === 200) {
        this.setState({
          loading: false,
          pasien: response.result
        });
        alert(`Sukses menambahkan hasil lab!`);
      } else {
        this.setState({
          loading: false
        });
        alert("Gagal menambahkan hasil lab!");
      }
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading msg="Fetching Data" />;
    } else {
      return (
        <FormAddLabResult
          pasien={this.state.pasien}
          onSubmit={this.handleFormSubmit}
        />
      );
    }
  }
}