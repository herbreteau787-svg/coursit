export const HTTP_CODES = [
            { code: '100', nom: 'Continue', d: "Le serveur a reçu les en-têtes, le client peut envoyer le corps de la requête." },
            { code: '200', nom: 'OK', d: "Requête réussie : la ressource demandée est renvoyée." },
            { code: '201', nom: 'Created', d: "Ressource créée avec succès (ex : après un POST)." },
            { code: '301', nom: 'Moved Permanently', d: "Redirection définitive : l'URL a changé pour toujours (les moteurs mettent à jour l'index)." },
            { code: '302', nom: 'Found', d: "Redirection temporaire : utilisez l'URL d'origine la prochaine fois." },
            { code: '400', nom: 'Bad Request', d: "La requête est malformée ou invalide (paramètre manquant, JSON malformé)." },
            { code: '401', nom: 'Unauthorized', d: "Authentification requise ou refusée (identifiants manquants/expirés)." },
            { code: '403', nom: 'Forbidden', d: "Le serveur a compris mais refuse : droits insuffisants même authentifié." },
            { code: '404', nom: 'Not Found', d: "La ressource n'existe pas (ou l'URL est fausse)." },
            { code: '500', nom: 'Internal Server Error', d: "Erreur côté serveur : regarder les journaux applicatifs." },
            { code: '502', nom: 'Bad Gateway', d: "Le serveur intermédiaire (proxy/équilibrage) reçoit une réponse invalide de l'amont." },
            { code: '503', nom: 'Service Unavailable', d: "Service momentanément indisponible : surcharge ou maintenance." }
        ];
