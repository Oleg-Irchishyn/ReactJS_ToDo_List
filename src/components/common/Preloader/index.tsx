import React from 'react';
//@ts-ignore
import preLoader from './../../../assets/images/preloader.gif';
//@ts-ignore
import styles from './../../../styles/components/Preloader.module.scss';

let Preloader: React.FC = () => {
  return (
    <div className={styles.preLoaderWrapper} style={{ backgroundColor: 'white' }}>
      <img className={styles.preLoaderWrapperImg} alt="preloader" src={preLoader} />
    </div>
  );
};

export default Preloader;
