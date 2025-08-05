import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useSessionTimer(loginTimeMs, sessionDurationMs = 5 * 60_000, warningBeforeMs = 15_000) {
    const [showWarning, setShowWarning] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loginTimeMs) return;

        const expireAt = loginTimeMs + sessionDurationMs;
        const warningAt = expireAt - warningBeforeMs;
        const now = Date.now();

        const msToWarning = warningAt - now;
        const msToExpire = expireAt - now;

        let warnTimer, expireTimer;

        // Programa el aviso
        if (msToWarning > 0) {
            warnTimer = setTimeout(() => setShowWarning(true), msToWarning);
        } else {
            // si ya estamos dentro de los últimos 15 s
            setShowWarning(true);
        }

        // Programa la recarga al expirar
        if (msToExpire > 0) {
            expireTimer = setTimeout(() => {
                window.location.reload();
            }, msToExpire);
        } else {
            window.location.reload();
        }

        return () => {
            clearTimeout(warnTimer);
            clearTimeout(expireTimer);
        };
    }, [loginTimeMs, sessionDurationMs, warningBeforeMs, navigate]);

    return showWarning;
}
