import React from "react";
import Header from "../Header";
import Footer from "../Footer";
const Contact=()=>{
    return(
        <div className="section contact-div">
            <Header/>
            <div>Contact</div>
           
            
  {/* <section className="section page-section" id="contact">
            <div className="container">
                
                <h1 className="page-section-heading text-center text-uppercase text-secondary mb-0">Contact Us</h1>
             
                <div className="divider-custom">
                    <div className="divider-custom-line"></div>
                    <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                    <div className="divider-custom-line"></div>
                </div>
              
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-7">
                       
                         <form >
                           
                          <div className="form-floating mb-3">
                                 <input className="form-control" id="name" type="text" placeholder="Enter your name..." />
                                <label for="name">Full name</label>
                        
                        </div>
                           
                            <div className="form-floating mb-3">
                        <input className="form-control" id="email" type="email" placeholder="name@example.com"  />
                        <label for="email">Email address</label>
                               
                            </div>
                           
                            <div className="form-floating mb-3">
                        <input className="form-control" id="phone" type="tel" placeholder="(123) 456-7890"  />
                                <label for="phone">Phone number</label>
                       
                            </div>
                         
                            <div className="form-floating mb-3">
                                <textarea className="form-control" id="message" type="text" placeholder="Enter your message here..." style={{height: "10rem"}}></textarea>
                                 <label for="message">Message</label>
                                
                            </div>
                           
                             <div className="d-none" id="submitSuccessMessage">
                                <div className="text-center mb-3">
                                    <div className="fw-bolder">Form submission successful!</div>
                                   To activate this form, sign up at
                        <br />
                        <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                </div>
                             </div>
                         
                            <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                            
                            <button className="btn btn-primary btn-xl disabled" id="submitButton" type="submit">Send</button>
                         </form>
                    </div>
                </div>
            </div>
        </section>  */}
       <Footer/>
        </div>
    )
}
export default Contact;