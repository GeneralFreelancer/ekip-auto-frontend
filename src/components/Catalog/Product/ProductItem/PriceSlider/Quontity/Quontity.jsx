const Quontity = ({quontity, text, isActive, styles}) => {
  return (
    <p>
      <span style={isActive ? {} : styles.chooseQuontity}>
        {quontity}{' '}
        <span style={isActive ? {} : styles.chooseQuontity}>{text}</span>
      </span>
    </p>
  );
};

export default Quontity;
