import React from 'react';
import { observable, computed, action } from 'mobx';

class FormDrugItem {
  @observable listDrug = {};
  @observable rowNumber = 1;

  // @computed get getListDrug = () => this.listDrug;

  @action addNewRow = () => {
    this.listDrug[this.rowNumber] = {};
    ++this.rowNumber;
  };

  @action updateListDrug = (rowNumber, drugObj) => {
    this.listDrug[rowNumber] = drugObj;
  };

  @action updateAmount = (id, amount) => {
    this.listDrug[id].amount = amount;
  };

  @action removeRow = (id) => {
    delete this.listDrug[id];
  };
}

export const formDrugItem = React.createContext(new FormDrugItem());
