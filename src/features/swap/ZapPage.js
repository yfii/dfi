import React, { useEffect } from 'react';
import ZapCommand from './sections/ZapCommand';

export default function ZapPage() {
    useEffect(() => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    }, []);
    return (
        <ZapCommand />
    );
  }