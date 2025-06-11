import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ to, subject, text, html }) => {
    const msg = {
        to,
        from: process.env.EMAIL_SENDER,
        subject,
        text,
        html
    };
    
    try {
        await sgMail.send(msg);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('SendGrid error:', error);
        throw error;
    }
};

export const sendWelcomeEmail = async (userEmail, userName) => {
    const msg = {
        to: userEmail,
        from: process.env.EMAIL_SENDER,
        subject: 'Benvenuto su CivicAlert!',
        text: `Ciao ${userName},\n\nGrazie per esserti registrato su CivicAlert.`,
        html: `
            <h2>Benvenuto su CivicAlert!</h2>
            <p>Ciao ${userName},</p>
            <p>Grazie per esserti registrato su CivicAlert.</p>
            <p>Buon utilizzo!</p>
        `
    };
    
    try {
        await sgMail.send(msg);
        console.log('Welcome email sent successfully');
    } catch (error) {
        console.error('SendGrid error:', error);
        throw error;
    }
};

export const sendSegnalazioneConfirmEmail = async (userEmail, userName, segnalazione) => {
    const msg = {
        to: userEmail,
        from: process.env.EMAIL_SENDER,
        subject: 'Segnalazione ricevuta - CivicAlert',
        text: `Ciao ${userName},\n\nLa tua segnalazione "${segnalazione.titolo}" è stata ricevuta con successo.\nCategoria: ${segnalazione.categoria}\nStato: ${segnalazione.stato}\n\nTi terremo aggiornato sullo stato della tua segnalazione.\n\nGrazie per il tuo contributo!\nIl team di CivicAlert`,
        html: `
            <h2>Segnalazione Ricevuta</h2>
            <p>Ciao ${userName},</p>
            <p>La tua segnalazione è stata ricevuta con successo.</p>
            <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
                <p><strong>Titolo:</strong> ${segnalazione.titolo}</p>
                <p><strong>Categoria:</strong> ${segnalazione.categoria}</p>
                <p><strong>Stato:</strong> ${segnalazione.stato}</p>
            </div>
            <p>Ti terremo aggiornato sullo stato della tua segnalazione.</p>
            <p>Grazie per il tuo contributo!</p>
            <p>Il team di CivicAlert</p>
        `
    };
    
    try {
        await sgMail.send(msg);
        console.log('Segnalazione confirmation email sent successfully');
    } catch (error) {
        console.error('SendGrid error:', error);
        throw error;
    }
};

export const sendStatusUpdateEmail = async (userEmail, userName, segnalazione) => {
    const statusMessages = {
        'in lavorazione': 'La tua segnalazione è ora in lavorazione. Il team sta valutando la situazione.',
        'risolto': 'La tua segnalazione è stata risolta con successo!',
        'rifiutato': 'La tua segnalazione è stata rifiutata.'
    };

    const msg = {
        to: userEmail,
        from: process.env.EMAIL_SENDER,
        subject: 'Aggiornamento Segnalazione - CivicAlert',
        text: `Ciao ${userName},\n\nLa tua segnalazione "${segnalazione.titolo}" è stata aggiornata.\nNuovo stato: ${segnalazione.stato}\n\n${statusMessages[segnalazione.stato]}\n\nGrazie per il tuo contributo!\nIl team di CivicAlert`,
        html: `
            <h2>Aggiornamento Segnalazione</h2>
            <p>Ciao ${userName},</p>
            <p>La tua segnalazione è stata aggiornata.</p>
            <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
                <p><strong>Titolo:</strong> ${segnalazione.titolo}</p>
                <p><strong>Categoria:</strong> ${segnalazione.categoria}</p>
                <p><strong>Nuovo Stato:</strong> <span style="color: ${
                    segnalazione.stato === 'risolto' ? '#28a745' : 
                    segnalazione.stato === 'in lavorazione' ? '#ffc107' : '#dc3545'
                };">${segnalazione.stato}</span></p>
                <p><em>${statusMessages[segnalazione.stato]}</em></p>
            </div>
            <p>Grazie per il tuo contributo nel migliorare la nostra città!</p>
            <p>Il team di CivicAlert</p>
        `
    };
    
    try {
        await sgMail.send(msg);
        console.log('Status update email sent successfully');
    } catch (error) {
        console.error('SendGrid error:', error);
        throw error;
    }
};
