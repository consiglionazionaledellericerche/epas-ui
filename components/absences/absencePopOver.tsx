import React, { useEffect, useState } from "react";
import { getSession } from 'next-auth/react';
import { CustomSession } from '../../../types/customSession';
import { Spinner } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import 'react-tooltip/dist/react-tooltip.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DateUtility from "../../utils/dateUtility";
import { AbsenceShow } from "../../types/absenceShow";
import { useTranslations } from 'next-intl';

library.add(faPaperPlane);

interface AbsencePopOverProps {
    day: number;
    showGroup: boolean;
    setShowTooltip: (show: boolean) => void;
    setTooltipContent: (content: React.ReactNode) => void;
    item: AbsenceShow;
}

const AbsencePopOver: React.FC<AbsencePopOverProps> = ({
    day,
    showGroup,
    setShowTooltip,
    setTooltipContent,
    item
}) => {
    const [data, setData] = useState<AbsenceShow | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const t = useTranslations('Message');

    useEffect(() => {
        const fetchData = async () => {
            if ('absenceType' in item) {
                setData(item);
                setIsLoading(false);
            } else {
                const session = await getSession();
                let accessToken = session?.accessToken || null;
                try {
                    const response = await fetch(`/api/rest/v4/absences/${item.id}`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Errore durante la richiesta API');
                    }

                    const data = await response.json();
                    setData(data);
                } catch (error) {
                    setError(error);
                    console.error("unable to achieve this", error);
                }

                setIsLoading(false);
            }
        };

        fetchData();
    }, [item]);

    if (isLoading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <div>Errore!</div>;
    }

    if (!data) {
        return <div>Errore!</div>;
    }

    const absenceCode = item.code;
    const absenceDescription = data.absenceType?.description;
    const absenceData = DateUtility.formatDate(data.date);
    const absenceJustifiedType = t(data.justifiedType);
    let absenceJustifiedTimeElem, nothingJustifiedElem, absenceNoteElem, hasGroupsElem;

    if (data.justifiedTime) {
        absenceJustifiedTimeElem = (
            <>
                <strong>Tipo Giustificazione</strong> {DateUtility.fromMinuteToHourMinute(data.justifiedTime)} <br/>
            </>
        );
    }

    if (data.nothingJustified) {
        nothingJustifiedElem = (
            <>
                <strong>Tempo Giustificato</strong> Questo codice non giustifica alcun orario.<br/>
            </>
        );
    }

    if (data.note) {
        absenceNoteElem = (
            <>
                <strong>Note</strong> {data.note}<br/>
            </>
        );
    }

    if (data.absenceType?.hasGroups && showGroup) {
        const rowRes = data.replacingAbsencesGroup?.map((replacingGroup: any) => {
            const query = {
                pathname: '/absencesGroups',
                query: {
                    groupAbsenceTypeId: replacingGroup.id,
                    personId: data.personDay.personId,
                    from: DateUtility.formatDateLocal(data.date)
                }
            };

            return (
                <span key={`row-res-${replacingGroup.id}`}>
                    <span>{replacingGroup.description}</span>
                    <Link href={query} passHref>
                        {/* Remove <a> tag */}
                        Riepilogo <i className="fa fa-external-link" aria-hidden="true"></i>
                    </Link>
                </span>
            );
        });

        hasGroupsElem = (
            <li key={`group-${item.code}-${day}`} className="list-group-item">
                <strong>Gruppo</strong><br/>
                {rowRes}
            </li>
        );
    }

    const contentTooltip = (
        <>
            <p>
                <span className="tooltip-icon-black"><FontAwesomeIcon icon={faPaperPlane}/></span>
                <strong className="text-success"> Il codice {absenceCode} verrà inviato ad attestati.</strong>
            </p>
            <ul className="list-group">
                <li key={`list-group-${absenceCode}-${day}`} className="list-group-item">
                    <strong>Codice</strong> <strong>{absenceCode}</strong><br/>
                    <strong>Descrizione</strong> {absenceDescription}<br/>
                    <strong>Data</strong> {absenceData}<br/>
                    <strong>Tipo Giustificazione</strong> {absenceJustifiedType} <br/>
                    {nothingJustifiedElem}
                    {absenceJustifiedTimeElem}
                    {absenceNoteElem}
                </li>
                {hasGroupsElem}
            </ul>
        </>
    );

    if (!absenceCode) {
        return null;
    }

    return (
        <div
            data-tooltip-id="tooltip-absencecode"
            onMouseEnter={() => {
                setTooltipContent(contentTooltip);
                setShowTooltip(true);
            }}
            onClick={() => setShowTooltip(false)}
        >
            {absenceCode}
        </div>
    );
};

export default AbsencePopOver;
