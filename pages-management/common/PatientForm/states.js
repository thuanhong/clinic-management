import React from 'react';
import { observable, computed, action } from 'mobx';

class FormStateStore {
  @observable genderValue = 'Male';
  @observable firstName = '';
  @observable lastName = '';
  @observable address = '';
  @observable birthDate = '';
  @observable identifyNumber = '';
  @observable insurance = '';
  @observable listDoctor = [];
  @observable doctorId = '';

  @observable firstNameError = '';
  @observable lastNameError = '';
  @observable addressError = '';
  @observable birthDateError = '';
  @observable identifyNumberError = '';
  @observable insuranceError = '';

  @action deleteDataInput = () => {
    this.genderValue = 'Male';
    this.firstName = '';
    this.lastName = '';
    this.address = '';
    this.birthDate = '';
    this.identifyNumber = '';
    this.insurance = '';
    this.listDoctor = [];
    this.doctorId = '';
    this.firstNameError = '';
    this.lastNameError = '';
    this.addressError = '';
    this.birthDateError = '';
    this.identifyNumberError = '';
    this.insuranceError = '';
  }

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

  @action updateBirthDate = (event) => {
    this.birthDate = event.target.value;
  };

  @action updateIdentifyNumber = (event) => {
    this.identifyNumber = event.target.value;
  };

  @action updateInsurance = (event) => {
    this.insurance = event.target.value;
  };

  @action updateListDoctor = (newListDoctor) => {
    this.listDoctor = newListDoctor;
  };

  @action updateDoctorId = (event) => {
    this.doctorId = event.target.value;
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

  @action updateBirthDateError = (event) => {
    this.birthDateError = event.target.value;
  };

  @action updateIdentifyNumberError = (event) => {
    this.identifyNumberError = event.target.value;
  };

  @action updateInsuranceError = (event) => {
    this.insuranceError = event.target.value;
  };

  checkFormValidate() {
    if (this.firstName.trim() === '') {
      this.firstNameError = 'This field is requied';
    }
    if (this.lastName.trim() === '') {
      this.lastNameError = 'This field is requied';
    }
    if (this.address.trim() === '') {
      this.addressError = 'This field is requied';
    }
    if (this.birthDate.trim() === '') {
      this.birthDateError = 'This field is requied';
    }
    if (this.identifyNumber.trim() === '') {
      this.identifyNumberError = 'This field is requied';
    }
    if (this.insurance.trim() === '') {
      this.insuranceError = 'This field is requied';
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
