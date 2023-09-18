import React from 'react'
import './Main.css'

function Cards({ data }) {
    return (
        <div className='cardContainer'>
            <section className="card1">
                <div className="circles">
                    <div></div>
                    <div></div>
                </div>
                <div className="number">
                    {
                        data.cardNo ? <div>{data.cardNo}</div> : <div>0000 0000 0000 0000</div>
                    }
                </div>
                <div className="name">
                    <div>
                        {
                            data.name ? <div>{data.name} </div> : <div>Ataul Mustafa </div>
                        }
                    </div>
                    <div>
                        {
                            data.expMonth ? <div>{data.expMonth}/{data.expYear}</div> : <div>00/00</div>
                        }
                    </div>
                </div>
            </section>
            <section className="card2">
                <div></div>
                <div>000</div>
            </section>
        </div>
    )
}

export default Cards