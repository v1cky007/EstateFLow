import React from 'react';
import './Membership.css';
import NavBar from './Navbar';

const Membership = () => {
  return (
    <div>

      <NavBar/>
    <section className="membership-section">
      <div className="container-fluid">
          
        <div className="container">
          <div className="row membership-row">
            <div className="col-sm-4">
              <div className="membership-card text-center">
                <div className="title">
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                  <h2>Bronze </h2>
                </div>
                <div className="price">
                  <h4><sup>$</sup>29</h4>
                </div>
                <div className="option">
                  <ul>
                    <li><i className="fa fa-check" aria-hidden="true"></i> Basic property listing</li>
                    <li><i className="fa fa-check" aria-hidden="true"></i> Standard customer support</li>
                    <li><i className="fa fa-check" aria-hidden="true"></i> Access to buying and selling tools</li>
                    <li><i className="fa fa-times" aria-hidden="true"></i> Basic property planning features</li>
                  </ul>
                </div>
                <a href="#">Order Now</a>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="membership-card text-center">
                <div className="title">
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                  <h2>Silver</h2>
                </div>
                <div className="price">
                  <h4><sup>$</sup>59</h4>
                </div>
                <div className="option">
                  <ul>
                    <li><i className="fa fa-check" aria-hidden="true"></i> All Bronze Plan features</li>
                    <li><i className="fa fa-check" aria-hidden="true"></i> Advanced property search filter</li>
                    <li><i className="fa fa-check" aria-hidden="true"></i> Enhanced customer support</li>
                    <li><i className="fa fa-times" aria-hidden="true"></i> Additional property planning tools</li>
                    <li><i className="fa fa-times" aria-hidden="true"></i> Access to market trend reports</li>
                  </ul>
                </div>
                <a href="#">Order Now</a>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="membership-card text-center">
                <div className="title">
                  <i className="fa fa-plane" aria-hidden="true"></i>
                  <h2>Gold</h2>
                </div>
                <div className="price">
                  <h4><sup>$</sup>99</h4>
                </div>
                <div className="option">
                  <ul>
                    <li><i className="fa fa-check" aria-hidden="true"></i> All Silver Plan features</li>
                    <li><i className="fa fa-check" aria-hidden="true"></i> Personalized property recommendations</li>
                    <li><i className="fa fa-check" aria-hidden="true"></i> Virtual tour capabilities</li>
                    <li><i className="fa fa-times" aria-hidden="true"></i> Advanced market analytics</li>
                    <li><i className="fa fa-times" aria-hidden="true"></i> Dedicated account manager</li>
                  </ul>
                </div>
                <a href="#">Order Now</a>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="membership-card text-center">
                <div className="title">
                  <i className="fa fa-rocket" aria-hidden="true"></i>
                  <h2>Platinum</h2>
                </div>
                <div className="price">
                  <h4><sup>$</sup>149</h4>
                </div>
                <div className="option">
                  <ul>
                    <li><i className="fa fa-check" aria-hidden="true"></i> All Gold Plan features</li>
                    <li><i className="fa fa-check" aria-hidden="true"></i> Premium property listing</li>
                    <li><i className="fa fa-check" aria-hidden="true"></i> Exclusive access to upcoming listing</li>
                    <li><i className="fa fa-check" aria-hidden="true"></i> Customized market insights</li>
                    <li><i className="fa fa-check" aria-hidden="true"></i> Full suite of property planning tools</li>
                    <li><i className="fa fa-check" aria-hidden="true"></i> 24/7 VIP support</li>
                  </ul>
                </div>
                <a href="#">Order Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Membership;
