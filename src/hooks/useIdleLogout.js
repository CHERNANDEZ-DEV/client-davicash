import { useEffect, useRef } from 'react';

export function useIdleLogout({
  enabled = true,
  idleTimeoutMs   = 30_000, // 2 min por defecto
  warningBeforeMs = 5_000,  // 15 s  por defecto
  onIdle,
  onWarn,
  onContinue,
}) {
  const idleTimerRef = useRef(null);
  const warnTimerRef = useRef(null);
  const warnedRef    = useRef(false);

  useEffect(() => {
    /* ───── Desactivado → limpia y sale ───── */
    if (!enabled) {
      clearTimeout(idleTimerRef.current);
      clearTimeout(warnTimerRef.current);
      warnedRef.current = false;
      return;
    }

    /* ───── Reinicia temporizadores ───── */
    const resetTimers = () => {
      clearTimeout(idleTimerRef.current);
      clearTimeout(warnTimerRef.current);

      if (warnedRef.current) {
        warnedRef.current = false;
        onContinue?.();              // Oculta la alerta si estaba visible
      }

      // Programa aviso
      warnTimerRef.current = setTimeout(() => {
        warnedRef.current = true;
        onWarn?.();
      }, idleTimeoutMs - warningBeforeMs);

      // Programa logout
      idleTimerRef.current = setTimeout(() => {
        onIdle?.();
      }, idleTimeoutMs);
    };

    /* ───── Eventos que cuentan como actividad ───── */
    const events = [
      'mousemove', 'mousedown', 'click', 'scroll',
      'keypress',  'touchstart', 'touchmove',
    ];
    events.forEach(ev =>
      window.addEventListener(ev, resetTimers, { passive: true })
    );

    resetTimers();                                // Arranque inicial

    /* ───── Limpieza ───── */
    return () => {
      events.forEach(ev =>
        window.removeEventListener(ev, resetTimers)
      );
      clearTimeout(idleTimerRef.current);
      clearTimeout(warnTimerRef.current);
    };
  }, [
    enabled,
    idleTimeoutMs,
    warningBeforeMs,
    onIdle,
    onWarn,
    onContinue,
  ]);
}
