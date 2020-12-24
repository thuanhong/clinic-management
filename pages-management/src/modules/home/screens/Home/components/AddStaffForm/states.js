import React from 'react';
import { observable, computed, action } from 'mobx';

class FormStateStore {
  @observable genderValue = 'Male';
  @observable firstName = '';
  @observable lastName = '';
  @observable bio = '';
  @observable location = '';
  @observable birthDay = '';
  @observable title = 'doctor';
  @observable email = '';
  @observable username = '';
  @observable image = '';

  @observable firstNameError = '';
  @observable lastNameError = '';
  @observable bioError = '';
  @observable locationError = '';
  @observable birthDayError = '';
  @observable emailError = '';
  @observable userNameError = '';

  @action updateGenderValue = (event) => {
    this.genderValue = event.target.value;
  };

  @action updateImageString = (str) => {
    this.image = str;
  };

  @action updateTitle = (event) => {
    this.title = event.target.value;
  };

  @action updateFirstName = (event) => {
    this.firstName = event.target.value;
  };

  @action updateLastName = (event) => {
    this.lastName = event.target.value;
  };

  @action updateBio = (event) => {
    this.bio = event.target.value;
  };

  @action updateLocation = (event) => {
    this.location = event.target.value;
  };

  @action updateBirthDay = (event) => {
    this.birthDay = event.target.value;
  };

  @action updateEmail = (event) => {
    this.email = event.target.value;
  };

  @action updateUsername = (event) => {
    this.username = event.target.value;
  };

  // Handle message error
  @action updateFirstNameError = (event) => {
    this.firstNameError = event.target.value;
  };

  @action updateLastNameError = (event) => {
    this.lastNameError = event.target.value;
  };

  @action updateBioError = (event) => {
    this.bioError = event.target.value;
  };

  @action updateLocationError = (event) => {
    this.locationError = event.target.value;
  };

  @action updateBirthDayError = (event) => {
    this.birthDayError = event.target.value;
  };

  @action updateEmailError = (event) => {
    this.emailError = event.target.value;
  };

  @action updateUserNameError = (event) => {
    this.userNameError = event.target.value;
  };

  checkFormValidate() {
    if (this.firstName.trim() === '') {
      this.firstNameError = 'This field is requied';
    }
    if (this.lastName.trim() === '') {
      this.lastNameError = 'This field is requied';
    }
    if (this.bio.trim() === '') {
      this.bioError = 'This field is requied';
    }
    if (this.location.trim() === '') {
      this.locationError = 'This field is requied';
    }
    if (this.birthDay.trim() === '') {
      this.birthDayError = 'This field is requied';
    }
    if (this.email.trim() === '') {
      this.emailError = 'This field is requied';
    }
    if (this.username.trim() === '') {
      this.userNameError = 'This field is requied';
    }

    if (
      [
        this.firstNameError,
        this.lastNameError,
        this.bioError,
        this.locationError,
        this.birthDayError,
        this.emailError,
        this.userNameError,
      ].every((field) => field !== '')
    ) {
      return false;
    }

    return true;
  }
}

export const formStateStore = React.createContext(new FormStateStore());