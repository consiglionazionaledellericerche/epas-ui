import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ButtonRemoveEvent = ({ event, onDelete, apiUrl }) => {

  const handleClick = () => {
    confirmAlert({
      title: "Eliminare questa reperibilità?",
      message: `${new Date(event.start).toLocaleDateString()} - ${event.title}`,
      buttons: [
        {
          label: (
            <>
              Elimina <i className="fa fa-trash-o" aria-hidden="true"></i>
            </>
          ),
          onClick: async () => {
            try {
              const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                }
              });

              if (!response.ok) throw new Error("Errore nella richiesta");

              onDelete(event.id);
              toast.success("Turno cancellato con successo!");
            } catch (error) {
              alert(error.message);
            }
          },
        },
        {
          label: "Annulla",
        },
      ],
    });
  };

  return (
    <button type="button" className="close btn-close" title="Rimuovi Reperibilità" onClick={handleClick}>
      <span aria-hidden="true">&times;</span>
    </button>
  );
};

export default ButtonRemoveEvent;
