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
}

export const formStateStore = React.createContext(new FormStateStore());
