import React, { useState } from 'react'
import Cards from './Cards';
import './Main.css';

function MainPage() {

    const initialInfo = {
        name: "",
        cardNo: "",
        expMonth: "",
        expYear: "",
        cvc: ""
    }

    const initialError = {
        nameError: "",
        cardError: "",
        monthError: "",
        yearError: "",
        cvcError: "",
    }

    const [cardInfo, setCardInfo] = useState(initialInfo);
    const [error, setError] = useState(initialError);
    const [data, setData] = useState("");


    function hasNumber(str) {
        return /\d/.test(str);
    }
    function hasChar(inputString) {
        return /^\d+$/.test(inputString);
    }
    function addSpacesToCreditCardNumber(cardNumber) {
        // Use regular expressions to add a space after every 4 characters
        return cardNumber.replace(/(.{4})/g, '$1 ');
      }

    const submitForm = (e) => {
        e.preventDefault();

        const date = new Date();

        let updatedErrors = { ...initialError }; // Initialize errors as empty

        if (!cardInfo.name) {
            updatedErrors.nameError = "Enter your name";
        } else if (hasNumber(cardInfo.name)) {
            updatedErrors.nameError = "Name cannot contain numbers";
        }

        if (!cardInfo.cardNo) {
            updatedErrors.cardError = "Enter your card number";
        } else if (!hasChar(cardInfo.cardNo)) {
            updatedErrors.cardError = "Card number cannot contain characters";
        } else if (cardInfo.cardNo.length > 16 || cardInfo.cardNo.length < 16) {
            updatedErrors.cardError = "Card number must be of 16 digits";
        }

        if (!cardInfo.expMonth) {
            updatedErrors.monthError = "Enter expiry month";
        } else if (!hasChar(cardInfo.expMonth)) {
            updatedErrors.monthError = "Enter month in numbers";
        } else if (parseInt(cardInfo.expMonth) > 12 || parseInt(cardInfo.expMonth) < 1) {
            updatedErrors.monthError = "Enter a valid month (1-12)";
        }

        if (!cardInfo.expYear) {
            updatedErrors.yearError = "Enter expiry year";
        } else if (!hasChar(cardInfo.expYear)) {
            updatedErrors.yearError = "Year cannot contain characters";
        } else if (parseInt(cardInfo.expYear) < date.getFullYear()) {
            updatedErrors.yearError = "Enter a valid year";
        }

        if (!cardInfo.cvc) {
            updatedErrors.cvcError = "Enter CVC";
        } else if (!hasChar(cardInfo.cvc)) {
            updatedErrors.cvcError = "CVC cannot contain characters";
        } else if (cardInfo.cvc.length !== 3) {
            updatedErrors.cvcError = "Enter a valid CVC (3 digits)";
        }


        setError(updatedErrors);

        if (
            !updatedErrors.nameError &&
            !updatedErrors.cardError &&
            !updatedErrors.monthError &&
            !updatedErrors.yearError &&
            !updatedErrors.cvcError
        ) {
            console.log(cardInfo);
            cardInfo.cardNo = addSpacesToCreditCardNumber(cardInfo.cardNo);
            setData(cardInfo);
        } else {
            console.log(updatedErrors);
        }
    };


    return (
        <div className='mainContainer'>
            <section className="card">
                <Cards data={data} />
            </section>
            <section className="formContainer">
                <div action="" className="formBox">
                    <form className='form' action="">
                        <div className="input">
                            <label htmlFor="name">cardholder name</label>
                            <input type="text" id='name' onChange={(e) => { setCardInfo({ ...cardInfo, name: e.target.value }) }} placeholder='eg. Ataul Mustafa' />
                            {
                                error.nameError ? <div className='error'>{error.nameError}</div> : <div className='error'> </div>
                            }
                        </div>
                        <div className="input">
                            <label htmlFor="cardNo">card number</label>
                            <input type="number" id='cardNo' onChange={(e) => { setCardInfo({ ...cardInfo, cardNo: e.target.value }) }} placeholder='e.g. 1234 5678 9123 0000' />
                            {
                                error.cardError ? <div className='error'>{error.cardError}</div> : <div className='error'> </div>
                            }
                        </div>
                        <div className="adjustInput">
                            <div>
                                <label >EXP.DATE (MM/YY)</label>
                                <div className='expDate'>
                                    <div>
                                        <input type="number" onChange={(e) => { setCardInfo({ ...cardInfo, expMonth: e.target.value }) }} placeholder='MM' />
                                        {
                                            error.monthError ? <div className='error'>{error.monthError}</div> : <div className='error'> </div>
                                        }

                                    </div>
                                    <div>
                                        <input type="number" onChange={(e) => { setCardInfo({ ...cardInfo, expYear: e.target.value }) }} placeholder='YYYY' />

                                        {
                                            error.yearError ? <div className='error'>{error.yearError}</div> : <div className='error'> </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="cvc">
                                <label htmlFor="cvc">cvc</label>
                                <input type="number" id='cvc' onChange={(e) => { setCardInfo({ ...cardInfo, cvc: e.target.value }) }} className='cvc' placeholder='e.g. 123' />
                                {
                                    error.cvcError ? <div className='error'>{error.cvcError}</div> : <div className='error'> </div>
                                }
                            </div>
                        </div>
                        <button onClick={(e) => { submitForm(e) }} className='submitButton' >Confirm </button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default MainPage