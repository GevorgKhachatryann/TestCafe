import {Selector} from 'testcafe';
import { ClientFunction } from 'testcafe';
import InputsPage from '../../src/pages/InputsPage';
import { randEmail, randFullName, randPost,randAddress,randNumber ,randFirstName,randLastName,randCity} from '@ngneat/falso';


const inputsPage = new InputsPage();
const getURL = ClientFunction(() => window.location.href);
const FullName:any = randFullName();
const number1:any = randNumber();
const number2:any = randNumber();
const citySelect = Selector('[id="select-demo"]');
const cityOption = citySelect.find('option');
const firstName = randFirstName();
const lastName = randLastName();
const email = randEmail();
const address:any = randAddress();
const city:any = randCity();
const stateSelect = Selector('[class="form-control selectpicker"]');
const stateOption = stateSelect.find('option');
 
fixture `Test-structure-1`
    .page `https://demo.seleniumeasy.com/`
    .beforeEach(async t => {
        await t.maximizeWindow();
        await t
            .expect(getURL()).contains('seleniumeasy');
});

test('Check "Single Form Demo" section functionality', async t =>{
    await inputsPage.selectInputForms()
    await t
        .expect(getURL()).contains('basic-first-form-demo');
    await inputsPage.typeMessage(FullName);
    await inputsPage.clickShowMessageBtn();
    const x = Selector('#display').withText(FullName);
    await t
        .expect((x).exists).ok();
     await t.expect(Selector('#display').innerText).eql(FullName,'check element text',{timeout:5000});
});

test('Check "Checkbox Demo" section functionality', async t =>{
    const checkbox = Selector('#isAgeSelected');
    const success = Selector('#txtAge').withText('Success - Check box is checked');

    await inputsPage.selectCheckbox();
    await t
        .expect(getURL()).contains('basic-checkbox-demo');
    await t
        .click(checkbox)
        .expect(checkbox.checked).ok();
    await t
        .expect((success).exists).ok();
    await t.expect(Selector('#txtAge').innerText).eql('Success - Check box is checked');
});

test('Check "Radio Buttons Demo" section functionality', async t =>{
    await inputsPage.selectRadio();
    await t
        .expect(getURL()).contains('basic-radiobutton-demo');
    await inputsPage.clickMaleBtn();
    await t
        .expect(inputsPage.maleBtn.checked).ok();
    await  inputsPage.clickGetValueBtn();
    const maleText = Selector('.radiobutton').withText("Radio button 'Male' is checked");
    const femaleText = Selector('.radiobutton').withText("Radio button 'Female' is checked");
    await t
        .expect((maleText).exists).ok();
    await t
        .expect(Selector('.radiobutton').innerText).eql("Radio button 'Male' is checked");
    await inputsPage.clickFemaleBtn();
    await t
        .expect(inputsPage.femaleBtn.checked).ok();
    await  inputsPage.clickGetValueBtn();
    await t
        .expect((femaleText).exists).ok();
    await t
        .expect(Selector('.radiobutton').innerText).eql("Radio button 'Female' is checked");
    let gender = ['[name="gender"][value="Male"]', '[name="gender"][value="Female"]']
    let age = [inputsPage.ageGroupIs, inputsPage.ageGroupIs2, inputsPage.ageGroupIs3]
    let genders = ['Male','Female']
    let ages = ['0 - 5','5 - 15','15 - 50']
    for(let i = 0; i < gender.length; i++){
        await t
            .click(Selector(gender[i]))
        for (let j = 0; j < age.length; j++){
            await t
                .click(Selector(age[j]));
            await t
                .click(inputsPage.getValues());
            const elementInnerText = await Selector('p.groupradiobutton').innerText;
            await t
                .expect(Selector('p.groupradiobutton').innerText).contains(genders[i]);
        }
    }



});
test('Check "Select Dropdown List" section functionality', async t =>{
    await inputsPage.selectDropdownSection();

    await t
        .expect(getURL()).contains('basic-select-dropdown-demo');

    await t
        .click(citySelect)
        .click(cityOption.withText('Monday'))
        .expect(citySelect.value).eql('Monday');
   await t
       .expect(Selector('.selected-value').innerText).contains('Day selected :- Monday');
    await t
        .click(citySelect)
        .click(cityOption.withText('Wednesday'))
        .expect(citySelect.value).eql('Wednesday');
    await t
        .expect(Selector('.selected-value').innerText).contains('Day selected :- Wednesday')
});

test('Check "Input Form Submit" section functionality', async t => {
    await inputsPage.selectFormSection();
    await t
        .expect(getURL()).contains('input-form-demo');
    await inputsPage.typeFirstName(firstName);
    await inputsPage.typeLastName(lastName);
    await t
       .typeText('#contact_form > fieldset > div:nth-child(4) > div > div > input',email)
    await t
        .typeText('[name="phone"]','(845)555-5555');
    // await t
    //     .typeText('[name="address"]',address);
    await t
        .typeText('.form-control',city);
    await t
        .click(stateSelect)
        .click(stateOption.withText('Arizona'))
        .expect(stateSelect.value).eql('Arizona');

});
