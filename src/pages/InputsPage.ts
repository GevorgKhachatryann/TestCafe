import { Selector, t } from 'testcafe';
import { randEmail, randFullName, randPost,randAddress,randNumber } from '@ngneat/falso';

const FullName:any = randFullName();
const Email:string = randEmail();



export default class InputsPage {
  
    public InputFormsBTn =  Selector('#navbar-brand-centered > ul:nth-child(1) > li:nth-child(1) > a');
    public simple =  Selector('#navbar-brand-centered > ul:nth-child(1) > li.dropdown.open > ul > li:nth-child(1) > a');
    public checkbox = Selector('#navbar-brand-centered > ul:nth-child(1) > li.dropdown.open > ul > li:nth-child(2) > a');
    public radio = Selector('#navbar-brand-centered > ul:nth-child(1) > li.dropdown.open > ul > li:nth-child(3) > a');
    public dropdown = Selector('#navbar-brand-centered > ul:nth-child(1) > li.dropdown.open > ul > li:nth-child(4) > a');
    public formSubmit = Selector('#navbar-brand-centered > ul:nth-child(1) > li.dropdown.open > ul > li:nth-child(5) > a');
    public message1  =  Selector('#user-message');
    public showBtn  =  Selector('#get-input > button');
    public newMessage   =  Selector('#display');
    public maleBtn = Selector('#easycont > div > div.col-md-6.text-left > div:nth-child(4) > div.panel-body > label:nth-child(2) > input[type=radio]');
    public femaleBtn = Selector('#easycont > div > div.col-md-6.text-left > div:nth-child(4) > div.panel-body > label:nth-child(3) > input[type=radio]');
    public getValue = Selector('#buttoncheck');
    public typeName = Selector('#contact_form > fieldset > div:nth-child(2) > div > div > input');
    public lastName = Selector('#contact_form > fieldset > div:nth-child(3) > div > div > input');
    public genderIsMale = Selector('[name="gender"][value="Male"]');
    public genderFemale = Selector('[name="gender"][value="Female"]');
    public ageGroupIs = Selector('[value="0 - 5"]');
    public ageGroupIs2 = Selector('[value="5 - 15"]');
    public ageGroupIs3 = Selector('[value="15 - 50"]');
    public getValues = Selector('.panel-body > .btn');
    
    async selectInputForms(){
        await t
            .click(this.InputFormsBTn)
            .click(this.simple);
    };
    async selectCheckbox(){
        await t
            .click(this.InputFormsBTn)
            .click(this.checkbox);
    };
    async selectDropdownSection(){
        await t
            .click(this.InputFormsBTn)
            .click(this.dropdown)
    };
    async selectFormSection(){
        await t
            .click(this.InputFormsBTn)
            .click(this.formSubmit)
    };
    async typeMessage(name:any){
           await t
                .typeText(this.message1,name);

        };
    async typeFirstName(name:any){
        await t
            .typeText(this.typeName,name)
    }
    async typeLastName(name:any){
        await t
            .typeText(this.typeName,name)
    }
    async clickShowMessageBtn(){
        await t
            .click(this.showBtn);
    };
    async selectRadio(){
        await t
            .click(this.InputFormsBTn)
            .click(this.radio);
    }
    async clickMaleBtn(){
        await t
            .click(this.maleBtn);
    }
    async clickGetValueBtn(){
        await t
            .click(this.getValue);
    }
    async clickFemaleBtn(){
        await t
            .click(this.femaleBtn);
    }

}
