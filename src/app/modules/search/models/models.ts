export interface Item {
  id: number;
  name: string;
}

export interface Act {
  id: number;
  act_number: string;
  claimant: string;
  classification: Item;
  court: Item;
  defendant: string;
  judge: Item;
  judgement_date: string;
  language: Item;
  region: Item;
  registration_date: string;
  result: Result;
  solution: string;
  appeal: Instance;
  cassation: Instance;
  download_url: string;
  first_instance: Instance;
  for_appeal_result: number;
  for_first_instance_result: null;
  legends: Result[];
  depersonalized_text: string;
  text: string;
}

export interface Instance {
  id: number;
  result: Result;
}

export interface Result {
  code: string;
  icon: string;
  id: number;
  name: string;
}

export interface Cycle {
  anomaly: boolean;
  appeal: Instance;
  cassation: Instance;
  first_instance: Instance;
  region_name: string;
}

export interface Row {
  act: Act;
  highlight: string;
}

export interface Category {
  code: string;
  id: number;
  name: string;
  probability: number;
  isActive?: boolean;
}

export interface Predict {
  class: string;
  proba: number;
  class_icon: string;
}

export interface ActGroup {
  id: number;
  distance: number;
  act: Act;
  anomaly: number;
}
