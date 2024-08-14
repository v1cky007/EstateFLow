import React from 'react';
import CardComponent from './CardComponent';
import styles from './CardContainer.module.css';

const CardContainer = () => {
  return (
    <div className={styles.featuresSection}>
      <h2 className={styles.featuresHeading}>Features</h2>
      <div className={styles.cardContainer}>
        <CardComponent
          imgSrc="https://images.pexels.com/photos/8730006/pexels-photo-8730006.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          title="Buy a House"
          description="Buying a home is a significant milestone and a complex process involving several steps and considerations."
          buttonText="Read more"
          linkTo="/buy-house"
        />
        <CardComponent
          imgSrc="https://images.pexels.com/photos/7578977/pexels-photo-7578977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          title="Sell a Property"
          description="Calculate your mortgage payoff amount and any other financial obligations related to the property."
          buttonText="Read more"
          linkTo="/sell-property"
        />
        <CardComponent
          imgSrc="https://images.pexels.com/photos/7578939/pexels-photo-7578939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          title="Rent a Property"
          description="Assess potential rental income against expenses like mortgage payments, property taxes, insurance and security deposit regulations."
          buttonText="Read more"
          linkTo="/rent-property"
        />
        <CardComponent
          imgSrc="https://images.pexels.com/photos/7641859/pexels-photo-7641859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          title="Budget Planning"
          description="Get comprehensive budget estimates, covering rent, utilities, and maintenance costs."
          buttonText="Read more"
          linkTo="/budget-planning"
        />
        <CardComponent
          imgSrc="https://images.pexels.com/photos/8730023/pexels-photo-8730023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          title="Virtual Tours"
          description="Experience properties remotely through immersive virtual tours."
          buttonText="Read more"
          linkTo="/virtual-tours"
        />
        <CardComponent
          imgSrc="https://images.pexels.com/photos/8292850/pexels-photo-8292850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          title="AI Contract Generator"
          description="Create customized rental agreements effortlessly, tailored to your needs."
          buttonText="Read more"
          linkTo="/ai-contract-generator"
        />
      </div>
    </div>
  );
};

export default CardContainer;
