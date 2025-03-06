import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { CustomSession } from '../../types/customSession';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PersonBadgeProps {
    data: any;
}

const PersonBadge: React.FC<PersonBadgeProps> = ({
  data
}) => {
  const [person, setPerson] = useState(null);
  const [badges, setBadges] = useState(null);

  useEffect(() => {
    if (!data || !data.id) return;

    const fetchData = async () => {
      try {
        const session = await getSession() as CustomSession;
        let accessToken = session ? session.accessToken : null;

        const response = await fetch(
          `/api/rest/v4?endpoint=badgesystems%2FpersonBadges&personId=${data.id}`,
          { method: 'GET' }
        );
        if (!response.ok) {
          throw new Error('Errore durante la richiesta API response.ok: ' + response.status);
        }
        const jsonData: any = await response.json();
        setPerson(jsonData.person);
        setBadges(jsonData.badges);
      } catch (error) {
        console.error("Errore durante la richiesta API", error);
      }
    };
    fetchData();
  }, [JSON.stringify(data)]);

  return (
      <>
        <br />

        <div className="container col-sm-12">
        {person?.canJoinBadges && (
          <div className="text-center mb-4">
            <a
              className="btn btn-success bg-green-500 text-white px-4 py-2 rounded"
              href={`@{joinBadgesPerson(${person.id})}`}
              data-async-modal="#modalInsertBadge"
            >
              Nuovo Badge {person.fullname}
            </a>
          </div>
        )}

        {badges?.length > 0 ? (
          <>
            <div className="col-sm-12">
              <Alert variant="info">
                Lista badge già associati a <strong>{person.fullname}</strong>.
              </Alert>
            </div>
            <table className="table table-hover border-collapse border border-gray-300 w-full">
              <thead>
                <tr className="warning">
                  <th>Gruppo Badge</th>
                  <th>Lettore di badge</th>
                  <th>
                    <FontAwesomeIcon icon="fa-credit-card" /> Codice
                  </th>
                  <th>Elimina</th>
                </tr>
              </thead>
              <tbody>
                {[...badges]
                  .sort((a, b) => a.code.localeCompare(b.code) || a.badgeReader.code.localeCompare(b.badgeReader.code))
                  .map((badge) => (
                    <tr key={badge.code}>
                      <td>{badge.badgeSystem.name}</td>
                      <td>{badge.badgeReader.code}</td>
                      <td>{badge.code}</td>
                      <td>
                        {person?.canDeleteBadges && (
                          <a
                            className="btn btn-danger btn-xs bg-red-500 text-white px-2 py-1 rounded"
                            href={`@{BadgeSystems.deleteBadgePerson(${badge.id})}`}
                            data-async-modal="#defaultModal"
                          >
                            Rimuovi
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        ) : (
          <div className="alert alert-warning bg-yellow-100 text-yellow-700 p-2 rounded">
            Non ci sono badge associati a <strong>{person?.fullname}</strong>.
          </div>
        )}
      </div>
    </>
    );
  };

export default PersonBadge;
