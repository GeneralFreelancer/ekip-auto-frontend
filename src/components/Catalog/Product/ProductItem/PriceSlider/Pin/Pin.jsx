import {useRef, useState, useEffect} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {ReactComponent as Pin} from '../../../../../../assets/svg/pin.svg';

import s from './Pin.module.scss';

const PinComponent = ({
  sliderItemActive,
  setSliderItemActive,
  minQuantity,
  minQuantity1,
  quantity,
  setQuantity,
}) => {
  // numberOfPins and setNumberOfPins is needed for calculationg number of pins according to main pin container width and to calculate how much quontity of products to add on one drag
  const mainBlockRef = useRef(null);
  const [mainBlockWidth, setMainBlockWidth] = useState(0);
  const [data, setData] = useState({
    pins: {pin1: {id: 'pin1'}},
    columns: {
      column1: {id: 'column1', pinIds: ['pin1']},
    },
    columnOrder: ['column1'],
  });
  const [numberOfPins, setNumberOfPins] = useState(0);
  const [middlePinIndex, setMiddlePinIndex] = useState(0);
  const [quantityStep, setQuantityStep] = useState(0);

  useEffect(() => {
    if (mainBlockRef.current) {
      const receivedWidth = mainBlockRef.current.getBoundingClientRect().width;
      const actualWidth = Math.ceil(receivedWidth);
      if (
        actualWidth - mainBlockWidth > 50 ||
        actualWidth - mainBlockWidth < -50 ||
        mainBlockWidth === 0
      ) {
        setMainBlockWidth(actualWidth);
      }
    }
  }, [mainBlockWidth]);

  useEffect(() => {
    function getData() {
      let pinsQuontityArray = [];
      for (let i = 0; i <= Math.floor(mainBlockWidth / 24); i++) {
        if (i > 0) {
          pinsQuontityArray.push(i);
        }
      }

      let pins = {};
      let pinIds = [];
      pinsQuontityArray.forEach((item) => {
        pins['pin' + item] = {id: 'pin' + item};
        pinIds.push('pin' + item);
      });

      const initialData = {
        pins,
        columns: {
          column1: {id: 'column1', pinIds},
        },
        columnOrder: ['column1'],
      };

      setData(initialData);
      setNumberOfPins(pinIds.length);
    }

    getData();
  }, [mainBlockWidth, setNumberOfPins]);

  useEffect(() => {
    if (numberOfPins > 0 && middlePinIndex === 0 && quantityStep === 0) {
      const pinIndexMiddle = Math.floor(numberOfPins / 2);
      const quontityStep = (minQuantity1 - 1) / (pinIndexMiddle + 1);

      setMiddlePinIndex(pinIndexMiddle);
      setQuantityStep(quontityStep);
    }
  }, [numberOfPins, middlePinIndex, quantityStep, minQuantity1]);

  const onClickLineMiddle = (e) => {
    e.preventDefault();

    const middleIndex = Math.floor((numberOfPins - 1) / 2);
    let pinCurrentIndex = 0;

    const column = data.columns['column1'];
    const newPinIds = Array.from(column.pinIds);
    newPinIds.forEach((pinId, i) => {
      if (pinId === 'pin1') {
        pinCurrentIndex = i;
      }
    });
    newPinIds.splice(pinCurrentIndex, 1);
    newPinIds.splice(middleIndex, 0, 'pin1');

    const newColumn = {...column, pinIds: newPinIds};
    const dataToSet = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };

    setData(dataToSet);
    setSliderItemActive({...sliderItemActive, 1: false, 2: true, 3: false});

    if (pinCurrentIndex < middleIndex) {
      setQuantity(
        quantity +
          (middleIndex - pinCurrentIndex) * quantityStep +
          quantityStep,
      );
    }

    if (pinCurrentIndex > middleIndex) {
      setQuantity(quantity - (pinCurrentIndex - middleIndex) * quantityStep);
    }
  };

  const onEnd = (result) => {
    const {destination, source, draggableId} = result;
    if (!result.destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = data.columns[source.droppableId];
    const newPinIds = Array.from(column.pinIds);
    newPinIds.splice(source.index, 1);
    newPinIds.splice(destination.index, 0, draggableId);

    const newColumn = {...column, pinIds: newPinIds};
    const dataToSet = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };

    setData(dataToSet);

    if (destination.index === 0 && draggableId === 'pin1') {
      setSliderItemActive({...sliderItemActive, 1: true, 2: false, 3: false});
    }

    if (destination.index === 10 && draggableId === 'pin1') {
      setSliderItemActive({...sliderItemActive, 1: false, 2: true, 3: false});
    }

    if (destination.index === numberOfPins - 1 && draggableId === 'pin1') {
      setSliderItemActive({...sliderItemActive, 1: false, 2: false, 3: true});
    }

    // Move slider forward
    if (
      source.index < destination.index &&
      destination.index < middlePinIndex &&
      draggableId === 'pin1'
    ) {
      setQuantity(quantity + (destination.index - source.index) * quantityStep);
    }

    if (
      source.index < destination.index &&
      destination.index === middlePinIndex &&
      draggableId === 'pin1'
    ) {
      setQuantity(
        quantity +
          (destination.index - source.index) * quantityStep +
          quantityStep,
      );
    }

    if (
      source.index < middlePinIndex &&
      destination.index > middlePinIndex &&
      destination.index < numberOfPins - 1 &&
      draggableId === 'pin1'
    ) {
      setQuantity(
        quantity +
          (destination.index - source.index) * quantityStep +
          quantityStep,
      );
    }

    if (
      source.index >= middlePinIndex &&
      destination.index <= numberOfPins - 1 &&
      draggableId === 'pin1'
    ) {
      setQuantity(quantity + (destination.index - source.index) * quantityStep);
    }

    if (
      source.index < middlePinIndex &&
      destination.index === numberOfPins - 1 &&
      draggableId === 'pin1'
    ) {
      setQuantity(
        quantity +
          (destination.index - source.index) * quantityStep +
          quantityStep,
      );
    }

    // Move slider backward
    if (
      destination.index < source.index &&
      destination.index > middlePinIndex &&
      draggableId === 'pin1'
    ) {
      setQuantity(quantity - (source.index - destination.index) * quantityStep);
    }

    if (
      destination.index < source.index &&
      destination.index <= middlePinIndex &&
      destination.index > 0 &&
      draggableId === 'pin1'
    ) {
      setQuantity(quantity - (source.index - destination.index) * quantityStep);
    }

    if (
      destination.index < source.index &&
      destination.index === 0 &&
      draggableId === 'pin1'
    ) {
      setQuantity(minQuantity);
    }
  };

  return (
    <DragDropContext onDragEnd={onEnd}>
      <div ref={mainBlockRef} className={s.dragDropContextContainer}>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const pins = column.pinIds.map((pinId) => data.pins[pinId]);
          return (
            <Droppable
              key={columnId}
              droppableId={column.id}
              direction="horizontal">
              {(provided) => (
                <div
                  key={column.id}
                  className={s.droppable}
                  ref={provided.innerRef}
                  {...provided.droppableProps}>
                  <div
                    className={s.middleButton}
                    onClick={(e) => onClickLineMiddle(e)}></div>
                  {pins.map((pin, index) => (
                    <Draggable key={pin.id} draggableId={pin.id} index={index}>
                      {(provided) => (
                        <div
                          className={s.pinContainer}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          {pin.id === 'pin1' ? <Pin /> : ''}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default PinComponent;
