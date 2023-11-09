
function String({ width, height, length, overtone }) {
  // make string get longer on right side if keys are pressed
  // make wave split into segments based on overtone
  // add a ruler underneath the width of one 
  // make wave vibrate somehow, maybe css animations?
  return (
    <>
      <svg width={width} height={height}>
        <line x1='0' y1={height / 2} x2={width} y2={height/2} stroke='white' strokeWidth='10'/>
      </svg>
    </>
  )
}

export default String