import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Reservation extends Component{
 state = {
    reservation: [],
    newReservation: {
        carName: '',
        model: '',
        year: '',
        date: '',
        description:''
    }, 
    isReservationFormDisplayed: false 
    }
    componentDidMount = () => {
        axios.get('api/reservation').then(res => {
            this.setState({reservations: res.data})
        })
      }
      toggleReservationForm = () => {
        this.setState((state, props) => {
            return ({isReservationFormDisplayed: !state.isReservationFormDisplayed})
        })
    }
  
    handleChange = (e) => {
      const cloneNewReservation = {...this.state.newReservation}
      cloneNewReservation[e.target.name] = e.target.value
      this.setState({newReservation: cloneNewReservation})
    }
  
    createCustomer = (e) => {
      e.preventDefault()
      axios
          .post('api/reservation', {
              carName: this.state.newReservation.carName,
              model: this.state.newReservation.model,
              year: this.state.newReservation.year,
              date: this.state.newReservation.date,

          })
          .then(res => {
              const reservationList = [...this.state.reservation]
              reservationList.unshift(res.data)
              this.setState({
                  newReservation: {
                    carName: '',
                    model: '',
                    year: '',
                    date: '',
                    description:''
                  },
                  isReservationFormDisplayed: false,
                  reservations: reservationList
              })
          })
  
    }
    render() {
        return (
          <div>
            <h1> Create a Reservation</h1>
            {
                this.state.reservations.map(reservations => {
                    return (
                        <div key={reservations._id}>
                            <Link
                                to={`/reservation/${reservations._id}`}
                            >
                                {reservations.carName}
                            </Link>
                        </div>
                    )
                })
            }
            <button onClick={this.toggleReservationForm}>+ New Reservation</button>
            {
                this.state.isReservationFormDisplayed
                    ? <form onSubmit={this.createReservation}>
                        <div>
                            <label htmlFor="carName">Car Model</label>
                            <input
                                id="carName"
                                type="text"
                                name="carName"
                                onChange={this.handleChange}
                                value={this.state.newReservation.carName}
                            />
                            <label htmlFor="model">Model</label>
                            <input
                                id="model"
                                type="text"
                                name="model"
                                onChange={this.handleChange}
                                value={this.state.newReservation.model}
                            />
                            <label htmlFor="year">Name</label>
                            <input
                                id="year"
                                type="text"
                                name="year"
                                onChange={this.handleChange}
                                value={this.state.newReservation.year}
                            />
                            <label htmlFor="date">Date</label>
                            <input
                                id="date"
                                type="text"
                                name="date"
                                onChange={this.handleChange}
                                value={this.state.newReservation.year}
                            />
                        </div>
                        <button> Send </button>
                    </form>
                    : null
            }<div>
            <Link to ="/"> Home </Link>
            </div>
          </div>
        )
      }
    
  
}
export default Reservation