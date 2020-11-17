import React from 'react';
import { observable, computed, action } from 'mobx';

class FormStateStore {
  @observable genderValue = 'Male';
  @observable firstName = '';
  @observable lastName = '';
  @observable address = '';
  @observable city = '';
  @observable state = '';
  @observable country = '';
  @observable age = '';
  @observable mobilePhone = '';

  @observable firstNameError = '';
  @observable lastNameError = '';
  @observable addressError = '';
  @observable cityError = '';
  @observable stateError = '';
  @observable countryError = '';
  @observable ageError = '';
  @observable mobilePhoneError = '';

  @action updateGenderValue = (event) => {
    this.genderValue = event.target.value;
  };

  @action updateFirstName = (event) => {
    this.firstName = event.target.value;
  };

  @action updateLastName = (event) => {
    this.lastName = event.target.value;
  };

  @action updateAddress = (event) => {
    this.address = event.target.value;
  };

  @action updateCity = (event) => {
    this.city = event.target.value;
  };

  @action updateState = (event) => {
    this.state = event.target.value;
  };

  @action updateCountry = (event) => {
    this.country = event.target.value;
  };

  @action updateAge = (event) => {
    this.age = event.target.value;
  };

  @action updateMobilePhone = (event) => {
    this.mobilePhone = event.target.value;
  };

  // Handle message error
  @action updateFirstNameError = (event) => {
    this.firstNameError = event.target.value;
  };

  @action updateLastNameError = (event) => {
    this.lastNameError = event.target.value;
  };

  @action updateAddressError = (event) => {
    this.addressError = event.target.value;
  };

  @action updateCityError = (event) => {
    this.cityError = event.target.value;
  };

  @action updateStateError = (event) => {
    this.stateError = event.target.value;
  };

  @action updateCountryError = (event) => {
    this.countryError = event.target.value;
  };

  @action updateAgeError = (event) => {
    this.ageError = event.target.value;
  };

  @action updateMobilePhoneError = (event) => {
    this.mobilePhoneError = event.target.value;
  };

  checkFormValidate() {
    if (this.firstName.trim() === '') {
      this.firstNameError = 'This field is requied';
    }
    if (this.lastName.trim() === '') {
      this.lastNameError = 'This field is requied';
    }
    if (this.city.trim() === '') {
      this.cityError = 'This field is requied';
    }
    if (this.country.trim() === '') {
      this.countryError = 'This field is requied';
    }
    if (this.age.trim() === '') {
      this.ageError = 'This field is requied';
    }
    if (this.mobilePhone.trim() === '') {
      this.mobilePhoneError = 'This field is requied';
    }
    if (this.address.trim() === '') {
      this.addressError = 'This field is requied';
    }

    if (
      [
        this.firstNameError,
        this.lastNameError,
        this.addressError,
        this.cityError,
        this.stateError,
        this.countryError,
        this.ageError,
        this.mobilePhoneError,
      ].every((field) => field !== '')
    ) {
      return false;
    }

    return true;
  }
}

export const formStateStore = React.createContext(new FormStateStore());
