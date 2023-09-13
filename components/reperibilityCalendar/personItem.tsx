import React from 'react';

function PersonItem({ person }) {
  const listItemStyle = {
    color: person.eventColor.textColor,
    backgroundColor: person.eventColor.backgroundColor,
    borderColor: person.eventColor.borderColor,
  };

  return (
    <li
      className={`list-group-item ${person.className}`}
      id={person.personId}
      data-draggable
      data-event={person.toJson}
      style={listItemStyle}
      data-toggle="popover"
      data-content={`Telefono: ${person.mobile} <br> Email: ${person.email}`}
    >
      {person.title}
    </li>
  );
}

export default PersonItem;
