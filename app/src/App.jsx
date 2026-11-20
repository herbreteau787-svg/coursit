import { useState, useEffect, useMemo } from 'react';
import bannerImg from './assets/alexander.jpg';
import bgHint from './assets/robynne.jpg';
import logoUrl from './assets/logo.png';
import { DynamicSVGDiagram } from './components/DynamicSVGDiagram.jsx';
import { COURSES_DATA } from './data/courses-ccna.js';
import { TSSR_COURSES } from './data/courses-tssr.js';
import { AIS_COURSES } from './data/courses-ais.js';
import { QCM_DATA } from './data/qcm.js';
import { PREP_DOMAINS } from './data/prep-domains.js';
import { PREP_QCM } from './data/prep-qcm.js';
import { PORTS_DATA } from './data/ports.js';
import { ESSENTIALS_COMMANDS } from './data/essentials-commands.js';
import { PRIVATE_RANGES } from './data/private-ranges.js';
import { HTTP_CODES } from './data/http-codes.js';
import { TOOLS_DATA } from './data/tools.js';
import { PS_TIPS } from './data/tips-powershell.js';
import { LIN_TIPS } from './data/tips-linux.js';
import { LABS_DATA } from './data/labs.js';
import { GLOSSARY_DATA } from './data/glossary.js';
import { CHEAT_SHEETS } from './data/cheatsheets.js';
import { ENGLISH_VOCAB } from './data/english-vocab.js';
import { DEPANNAGE_DATA } from './data/depannage.js';
import { SCRIPTS_LIB } from './data/scripts-lib.js';


        // --- DONNÉES DE COURS (CCNA v1.1 & v2.0) ; les cours TSSR/AIS à leçons sont définis plus bas ---

        // --- COURS TSSR (A LEÇONS, PAR CP — RÉDIGÉS PÉDAGOGIQUEMENT) ---

        // --- COURS AIS (A LEÇONS, PAR CP — RÉDIGÉS PÉDAGOGIQUEMENT) ---

        // --- FUSION DES PARCOURS : TSSR (leçons) + AIS (leçons) + fiches CCNA (fiches) ---
        const ALL_MODULE_ENTRIES = [...TSSR_COURSES, ...AIS_COURSES, ...COURSES_DATA];

        // --- ÉTIQUETTES DE VERSION / DATE DE VÉRIFICATION (FONC-24, NF-15, REC-10) ---
        const CONTENT_LAST_CHECK = '09/11/2026';
        const versionLabel = (parcours) => {
            if (!parcours) return '';
            if (parcours === 'TSSR') return 'REAC TP-01351 · Référentiel TSSR 2023';
            if (parcours === 'AIS') return 'REAC TP-01352 · Référentiel AIS 2023';
            if (parcours === 'CCNA v1.1') return 'CCNA 200-301 · Blueprint v1.1 (examen avant le 3 février 2027)';
            if (parcours === 'CCNA v2.0') return 'CCNA 200-301 · Blueprint v2.0 (examen dès le 3 février 2027)';
            return parcours;
        };
        const parcoursFilterKey = (parcours) => {
            if (!parcours) return 'ALL';
            if (parcours === 'TSSR') return 'TSSR';
            if (parcours === 'AIS') return 'AIS';
            if (parcours.startsWith('CCNA')) return 'CCNA';
            return 'ALL';
        };

        // --- BANQUE DE QCM (FONC-09 / FONC-10) ---

        // --- PRÉPARATION EXAMEN CCNA (contenu original, thèmes alignés sur ITN/SRWE/ENSA v7) ---
        // Banque d'entraînement originale (thèmes Cisco v7, questions originales)
        // type: 'qcm' (une réponse), 'multi' (plusieurs), 'vf' (vrai/faux), 'depannage' (scénario), 'config' (commandes IOS), 'subnet' (calcul)
        // lvl: 1 débutant, 2 intermédiaire, 3 examen final, 4 pièges

        // Ancien onglet « Prépa Examen » : le contenu utile est réinjecté dans la banque QCM principale
        PREP_QCM.forEach((q, i) => {
            const domName = (PREP_DOMAINS.find(d => d.id === q.dom) || {}).nom || q.dom;
            QCM_DATA.push({
                id: 300 + i, certif: 'CCNA', cp: domName, version: 'v2.0', level: q.lvl,
                question: q.q,
                options: q.options.map((t, j) => ({ text: t, correct: q.correct.includes(j), exp: q.exp }))
            });
        });

        // --- LES INDISPENSABLES (référence quotidienne technicien / admin sys / admin réseau) ---








        // --- GLOSSAIRE ET CHEAT SHEETS (FONC-12 / FONC-13) ---
        // Recherche insensible à la casse et aux accents (enrichissement contenu 2026-11)
        const normText = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        // Schéma : term (sigle/terme), en (développement anglais), def (définition FR), certif (certifications concernées),
        // cat (thème), util (utilité / exemple concret). Sources : cours_IT-main (Cours_Linux, Cours_réseau, Cours_windows,
        // Cisco, Docker, Sauvegarde_restauration, Virtualisation, Zabbix…) et Cours_TSSR-main (Ateliers, Cheat_Sheets).

        // Schéma étendu : title, cat, env, certif + commands[{cmd, desc (objectif+résultat), ex (exemple concret), risk ("consultation" / "modification" / "destructif"), mode (prérequis/droits)}].

        // Schéma : type (thème), en, fr, exEn (phrase d'exemple en anglais), exFr (sa traduction). Exemples issus des sources du projet (cours_IT-main, Cours_TSSR-main).

        // --- FICHES DEPANNAGE PROFESSIONNELLES (source : Knowledge-base-main + PrepaExamTSSR) ---
        // Format : symptôme → contexte → vérifications rapides → outils → commandes → diagnostic détaillé → causes → résolution → prévention → cas d'entreprise

        // --- BIBLIOTHÈQUE DE SCRIPTS OPÉRATIONNELS (Windows PowerShell/Batch + Linux Bash, classés par fréquence) ---
        /* DynamicSVGDiagram : voir components/DynamicSVGDiagram.jsx */

const QcmSection = ({ qcmData, filterLabel, onFilterChange, filterOptions, showFilter, onSessionFinish }) => {
            // Modes FONC-10 : 'train' (entraînement) | 'chrono' (chronométré) | 'errors' (révision des erreurs)
            const [mode, setMode] = useState('train');
            const [chronoStarted, setChronoStarted] = useState(false);
            const [durationMin, setDurationMin] = useState(20);
            const [activeQcmIndex, setActiveQcmIndex] = useState(0);
            const [answers, setAnswers] = useState({});
            const [finished, setFinished] = useState(false);
            const [secondsLeft, setSecondsLeft] = useState(null);
            const [frozenErrors, setFrozenErrors] = useState(null);
            const [sessionPerCp, setSessionPerCp] = useState({});
            const [errorIds, setErrorIds] = useState(() => {
                try { return JSON.parse(localStorage.getItem('tssr_qcm_errors') || '[]'); } catch (e) { return []; }
            });

            const errorSet = new Set(errorIds);
            // En mode erreurs, on gèle la liste au démarrage pour que les indices restent stables
            const displayData = mode === 'errors' ? (frozenErrors === null ? qcmData.filter(q => errorSet.has(q.id)) : frozenErrors) : qcmData;

            const resetSession = () => {
                setActiveQcmIndex(0);
                setAnswers({});
                setFinished(false);
                setSecondsLeft(null);
                setChronoStarted(false);
                setFrozenErrors(null);
            };

            // Reprendre à la première question quand le filtre ou le mode change
            useEffect(() => {
                resetSession();
            }, [mode, qcmData, filterLabel]);

            const persistErrors = (ids) => {
                setErrorIds(ids);
                try { localStorage.setItem('tssr_qcm_errors', JSON.stringify(ids)); } catch (e) { /* stockage indisponible */ }
            };

            // Chronomètre (tick 1 s, s'arrête quand le temps est épuisé)
            useEffect(() => {
                if (mode !== 'chrono' || !chronoStarted || finished) return undefined;
                const t = setInterval(() => setSecondsLeft(s => (s === null ? null : Math.max(0, s - 1))), 1000);
                return () => clearInterval(t);
            }, [mode, chronoStarted, finished]);

            const finishSession = () => {
                setFinished(true);
                // Mise à jour de la liste d'erreurs : on ajoute les ratées, on retire celles réussies
                const currentIds = new Set(displayData.map(q => q.id));
                const wrong = displayData
                    .map((q, i) => ({ q, i }))
                    .filter(x => answers[x.i] !== undefined && !x.q.options[answers[x.i]].correct)
                    .map(x => x.q.id);
                const right = displayData
                    .map((q, i) => ({ q, i }))
                    .filter(x => answers[x.i] !== undefined && x.q.options[answers[x.i]].correct)
                    .map(x => x.q.id);
                const kept = errorIds.filter(id => !(currentIds.has(id) && right.includes(id)));
                persistErrors(Array.from(new Set([...kept, ...wrong])));
                // Score par compétence / domaine (FONC-15)
                const perCp = {};
                displayData.forEach((q, i) => {
                    if (answers[i] === undefined) return;
                    if (!perCp[q.cp]) perCp[q.cp] = { correct: 0, total: 0 };
                    perCp[q.cp].total += 1;
                    if (q.options[answers[i]].correct) perCp[q.cp].correct += 1;
                });
                if (onSessionFinish) {
                    try { onSessionFinish(JSON.parse(JSON.stringify(perCp)), mode === 'chrono' ? 'chrono' : 'entrainement'); } catch (e) { /* pas de blocage */ }
                }
                setSessionPerCp(JSON.parse(JSON.stringify(perCp)));
            };

            // Fin automatique quand le chrono atteint zéro
            useEffect(() => {
                if (mode === 'chrono' && chronoStarted && secondsLeft === 0 && !finished) finishSession();
            }, [secondsLeft]);

            const safeIdx = Math.min(activeQcmIndex, Math.max(displayData.length - 1, 0));
            const currentQcm = displayData[safeIdx];
            const answeredHere = answers[safeIdx];

            const answerTrain = (optIdx) => {
                if (answeredHere !== undefined || finished) return;
                const ok = currentQcm.options[optIdx].correct;
                setAnswers(prev => ({ ...prev, [safeIdx]: optIdx }));
                // Entraînement / erreurs : correction immédiate + suivi des erreurs
                const id = currentQcm.id;
                const nextIds = ok ? errorIds.filter(x => x !== id) : Array.from(new Set([...errorIds, id]));
                persistErrors(nextIds);
            };

            const answerChrono = (optIdx) => {
                if (finished) return;
                setAnswers(prev => ({ ...prev, [safeIdx]: optIdx }));
            };

            if (!currentQcm) {
                return (
                    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl p-10 border border-slate-200 dark:border-slate-700 shadow-sm text-center space-y-3">
                        <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center text-2xl">✍️</div>
                        {mode === 'errors' ? (
                            <>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Aucune erreur à revoir 👍</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Le mode « Révision des erreurs » regroupe les questions ratées dans vos dernieres sessions. Passez une session en mode Entraînement : vos erreurs apparaîtront ici.</p>
                            </>
                        ) : (
                            <>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Aucune question pour ce filtre</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Choisissez « Toutes les questions » ou un autre sujet pour réviser.</p>
                            </>
                        )}
                    </div>
                );
            }

            const modeButton = (value, icon, label) => (
                <button
                    onClick={() => { setMode(value); }}
                    aria-pressed={mode === value}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        mode === value
                            ? 'bg-brand-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                >
                    {icon} {label}
                </button>
            );

            const modeTitle = finished
                ? 'Résultats de la session'
                : (mode === 'chrono' ? 'Banque QCM (Mode Chronométré)' : mode === 'errors' ? 'Banque QCM (Révision des erreurs)' : 'Banque QCM (Mode Entraînement)');

            // --- Vue résultats (fin de session, auto ou manuelle) ---
            if (finished) {
                const answeredCount = Object.keys(answers).length;
                const correctCount = displayData.reduce((n, q, i) => (answers[i] !== undefined && q.options[answers[i]].correct ? n + 1 : n), 0);
                const pct = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
                return (
                    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
                        <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Résultats de la session</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {correctCount} bonne{correctCount > 1 ? 's' : ''} réponse{correctCount > 1 ? 's' : ''} sur {answeredCount} répondue{answeredCount > 1 ? 's' : ''} — score : {pct} %.
                                {mode === 'chrono' && ' Le chrono a été arrêté, comme le jour de l\'examen.'}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Les questions ratées sont enregistrées : elles vous seront reproposées par le mode « Révision des erreurs ».</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xs uppercase font-bold text-sky-500 tracking-wider">Score par compétence / domaine (cette session)</h3>
                            {Object.keys(sessionPerCp).length === 0 ? (
                                <p className="text-xs text-slate-500 dark:text-slate-400">Aucune question répondue — rien à afficher.</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(sessionPerCp).map(([cp, r]) => {
                                        const p = Math.round((r.correct / r.total) * 100);
                                        return (
                                            <span key={cp} className={`text-xs font-bold px-3 py-1 rounded-full border ${
                                                p >= 80
                                                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                                                    : p >= 50
                                                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                                                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                                            }`}>
                                                {cp} : {r.correct}/{r.total} ({p} %)
                                            </span>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="space-y-3">
                            {displayData.map((q, i) => (
                                <div key={q.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 space-y-2">
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                        <span className="text-[10px] font-mono text-sky-500 mr-2">[{q.cp}]</span>{q.question}
                                    </p>
                                    {answers[i] === undefined ? (
                                        <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">⚠️ Sans réponse</p>
                                    ) : (
                                        <p className={`text-xs font-semibold ${q.options[answers[i]].correct ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                            {q.options[answers[i]].correct ? '✓ Bonne réponse' : '✗ Mauvaise réponse'}
                                        </p>
                                    )}
                                    <ul className="space-y-1">
                                        {q.options.map((opt, idx) => (
                                            <li key={idx} className={`text-xs ${
                                                opt.correct
                                                    ? 'text-emerald-700 dark:text-emerald-300 font-semibold'
                                                    : (answers[i] === idx ? 'text-rose-700 dark:text-rose-300' : 'text-slate-600 dark:text-slate-400')
                                            }`}>
                                                {String.fromCharCode(65 + idx)}. {opt.text}{opt.correct ? ' ✓' : (answers[i] === idx ? ' ← votre choix' : '')}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="text-xs p-2 rounded bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-l-2 border-slate-400">
                                        <span className="font-bold">Explication : </span>{q.options.find(o => o.correct) ? q.options.find(o => o.correct).exp : ''}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
                            <button
                                onClick={resetSession}
                                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-600"
                            >
                                ↻ Recommencer une session
                            </button>
                        </div>
                    </div>
                );
            }

            // --- Vue chrono : écran de lancement tant que le test n'a pas commencé ---
            const chronoLaunch = (mode === 'chrono' && !chronoStarted);
            const mm = secondsLeft === null ? '--' : String(Math.floor(secondsLeft / 60)).padStart(2, '0');
            const ss = secondsLeft === null ? '--' : String(secondsLeft % 60).padStart(2, '0');

            return (
                <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
                    <div className="flex flex-wrap gap-3 justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4">
                        <div>
                            <span className="text-xs font-bold text-sky-500">{currentQcm.certif} · {currentQcm.cp}</span>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{modeTitle}</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            {showFilter && (
                                <select
                                    value={filterLabel}
                                    onChange={(e) => onFilterChange(e.target.value)}
                                    aria-label="Filtrer les questions par sujet"
                                    className="bg-slate-100 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700 px-2 py-1.5"
                                >
                                    {filterOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            )}
                            <span className="text-xs font-mono bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full text-slate-600 dark:text-slate-300">
                                Question {safeIdx + 1} / {displayData.length}
                            </span>
                        </div>
                    </div>

                    {/* Sélecteur de mode (FONC-10) */}
                    {showFilter && (
                        <div className="flex flex-wrap gap-2" role="group" aria-label="Mode de révision">
                            {modeButton('train', '🎓', 'Entraînement')}
                            {modeButton('chrono', '⏱️', 'Chronométré')}
                            {modeButton('errors', '🔁', 'Révision des erreurs')}
                        </div>
                    )}

                    {chronoLaunch ? (
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4 text-center">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Test chronométré sur les questions filtrées ({displayData.length} question{displayData.length > 1 ? 's' : ''}).</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Durée de l'examen blanc : {durationMin} minutes. La correction et les explications ne s'affichent qu'à la fin. Les questions sans réponse sont comptées comme ratées.</p>
                            <div className="flex flex-wrap justify-center items-center gap-3">
                                <label htmlFor="chrono-duration" className="text-xs font-bold text-slate-600 dark:text-slate-300">Durée :</label>
                                <select
                                    id="chrono-duration"
                                    value={durationMin}
                                    onChange={(e) => setDurationMin(parseInt(e.target.value, 10))}
                                    className="bg-slate-100 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700 px-2 py-1.5"
                                >
                                    <option value="20">20 minutes</option>
                                    <option value="30">30 minutes</option>
                                    <option value="45">45 minutes</option>
                                    <option value="90">1 h 30</option>
                                    <option value="120">2 heures</option>
                                </select>
                                <button
                                    onClick={() => { setChronoStarted(true); setSecondsLeft(durationMin * 60); }}
                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-colors"
                                >
                                    ▶ Démarrer le test
                                </button>
                            </div>
                            <p className="text-[10px] text-slate-400">Rappel : un entraînement chronométré n'a aucune valeur de certification.</p>
                        </div>
                    ) : (
                        <>
                            {mode === 'chrono' && (
                                <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border border-purple-500/30 bg-purple-500/10">
                                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300">⏱️ Temps restant : <span className="font-mono text-base">{mm}:{ss}</span></span>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Le test s'arrête automatiquement à 00:00.</span>
                                </div>
                            )}

                            <div className="text-base font-semibold text-slate-800 dark:text-slate-100">
                                {currentQcm.question}
                            </div>

                            <div className="space-y-3">
                                {currentQcm.options.map((opt, idx) => {
                                    const isSelected = answeredHere === idx;
                                    let btnStyle = "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-brand-500";

                                    if (answeredHere !== undefined && mode !== 'chrono') {
                                        if (opt.correct) {
                                            btnStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-medium";
                                        } else if (isSelected && !opt.correct) {
                                            btnStyle = "bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300 font-medium";
                                        }
                                    } else if (isSelected && mode === 'chrono') {
                                        btnStyle = "bg-purple-500/10 border-purple-500 text-purple-700 dark:text-purple-300 font-medium";
                                    }

                                    return (
                                        <div key={idx} className="space-y-2">
                                            <button
                                                onClick={() => (mode === 'chrono' ? answerChrono(idx) : answerTrain(idx))}
                                                className={`w-full text-left p-4 rounded-lg border text-sm transition-all flex items-start justify-between ${btnStyle}`}
                                            >
                                                <span>{String.fromCharCode(65 + idx)}. {opt.text}</span>
                                                {answeredHere !== undefined && mode !== 'chrono' && opt.correct && (
                                                    <span className="text-emerald-500 font-bold text-xs">✓ Correct</span>
                                                )}
                                            </button>

                                            {answeredHere !== undefined && mode !== 'chrono' && (
                                                <div className="text-xs p-3 rounded bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 ml-4 border-l-2 border-slate-400">
                                                    <span className="font-bold">Explication : </span>{opt.exp}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                                <button
                                    disabled={safeIdx === 0}
                                    onClick={() => setActiveQcmIndex(prev => Math.max(0, prev - 1))}
                                    className="px-4 py-2 bg-slate-100 dark:bg-slate-700 disabled:opacity-50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold"
                                >
                                    Question précédente
                                </button>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={finishSession}
                                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
                                        title={mode === 'chrono' ? 'Arrêter le test maintenant et voir le score' : 'Arrêter ici et voir votre score'}
                                    >
                                        {mode === 'chrono' ? '⏹️ Terminer le test' : '✓ Terminer la session'}
                                    </button>
                                    <button
                                        disabled={safeIdx === displayData.length - 1}
                                        onClick={() => setActiveQcmIndex(prev => Math.min(displayData.length - 1, prev + 1))}
                                        className="px-4 py-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold"
                                    >
                                        Question suivante
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            );
        };

        // --- COMPOSANTS POUR LES COURS A LEÇONS (TSSR / AIS PAR CP) ---

        const ExerciseItem = ({ ex, num }) => {
            const [open, setOpen] = useState(false);
            return (
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        <span className="text-brand-500 font-bold">Exercice {num} — </span>{ex.enonce}
                    </p>
                    <button
                        onClick={() => setOpen(!open)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 transition-colors"
                    >
                        {open ? 'Masquer la correction' : 'Voir la correction'}
                    </button>
                    {open && (
                        <div className="text-xs p-3 rounded bg-emerald-500/5 border border-emerald-500/20 text-slate-700 dark:text-slate-300 leading-relaxed">
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">Corrigé expliqué : </span>{ex.correction}
                        </div>
                    )}
                </div>
            );
        };


        const LessonCourseView = ({ course, isDone, onToggleDone, prev, next, onGoTo, onOpenTab }) => (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
                {/* En-tête du CP */}
                <div className="border-b border-slate-200 dark:border-slate-700 pb-4 flex flex-wrap gap-3 justify-between items-start">
                    <div>
                        <div className="flex items-center flex-wrap gap-2">
                            <span className="px-2.5 py-0.5 bg-brand-500/10 text-brand-500 text-xs font-mono font-bold rounded">
                                {course.parcours} · {course.code}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                Niveau : {course.niveau}
                            </span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{course.title}</h2>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                            🏷️ {versionLabel(course.parcours)} · Contenu vérifié le {CONTENT_LAST_CHECK}
                        </p>
                    </div>
                    <button
                        onClick={onToggleDone}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            isDone
                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                    >
                        {isDone ? '✓ Acquis' : 'Marquer comme acquis'}
                    </button>
                </div>

                {/* Objectifs & Prérequis */}
                <div className="space-y-3">
                    <h3 className="text-xs uppercase font-bold text-brand-500 tracking-wider">Objectifs et prérequis de ce CP</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 bg-sky-500/5 rounded-lg border border-sky-500/20">
                            <span className="text-[11px] font-bold uppercase text-sky-600 dark:text-sky-400 block mb-1.5">🎯 Compétences visées à la fin de ce CP :</span>
                            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                                {course.objectifs.map((obj, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <span className="text-sky-500 font-bold">✓</span>
                                        <span>{obj}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800">
                            <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1.5">🧭 Prérequis</span>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{course.prerequis}</p>
                        </div>
                    </div>
                </div>

                {/* Leçons */}
                <div className="space-y-4">
                    <h3 className="text-xs uppercase font-bold text-brand-500 tracking-wider">Leçons du CP — à lire dans l'ordre</h3>
                    {course.lessons.map((l, i) => (
                        <div key={i} className="space-y-3 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{l.title}</h4>
                            {l.parts.map((p, j) => (
                                <div key={j} className="pl-3 border-l-2 border-brand-500/30">
                                    <h5 className="text-xs font-bold text-brand-600 dark:text-sky-300">{p.h}</h5>
                                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mt-1">{p.t}</p>
                                    {p.img && (
                                        <figure className="mt-2 p-2 bg-white dark:bg-slate-100 rounded-lg border border-slate-200 shadow-sm">
                                            <img src={`${import.meta.env.BASE_URL}${p.img}`} alt={p.imgCaption || p.h} loading="lazy" className="w-full h-auto rounded" />
                                            <figcaption className="text-[10px] text-slate-500 dark:text-slate-600 mt-1.5 px-1">{p.imgCaption}</figcaption>
                                        </figure>
                                    )}
                                    {p.schema && <div className="mt-2"><DynamicSVGDiagram type={p.schema} /></div>}
                                </div>
                            ))}
                            {l.schema && <DynamicSVGDiagram type={l.schema} />}
                            {l.table && l.table.length > 0 && (
                                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                                    <table className="w-full text-xs">
                                        <tbody>
                                            {l.table.map((row, ri) => (
                                                <tr key={ri} className={ri === 0 ? 'bg-slate-100 dark:bg-slate-900/70' : 'border-t border-slate-100 dark:border-slate-800'}>
                                                    {row.map((cell, ci) => (
                                                        <td key={ci} className={`p-2 ${ri === 0 ? 'font-bold text-slate-600 dark:text-slate-300' : 'text-slate-700 dark:text-slate-300'} ${ci === 0 && ri > 0 ? 'font-semibold text-slate-900 dark:text-white' : ''}`}>{cell}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Procédures GUI pas-à-pas (guiSteps) : interface d'abord, CLI ensuite */}
                {course.guiSteps && course.guiSteps.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-xs uppercase font-bold text-brand-500 tracking-wider">Procédures pas à pas — suivez l'ordre, cliquez, observez</h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Chaque étape indique <strong>où cliquer</strong>, <strong>ce que vous voyez</strong> et <strong>ce qu'il faut observer</strong>. Suivez dans l'ordre sur votre VM de labo.</p>
                        {course.guiSteps.map((step, si) => (
                            <div key={si} className="space-y-2 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">{si + 1}</span>
                                    {step.title}
                                </h4>
                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-8">{step.action}</p>
                                {step.observation && (
                                    <div className="pl-8 text-xs text-sky-700 dark:text-sky-300 bg-sky-500/5 border-l-4 border-sky-500/30 pl-4 py-1.5 rounded">
                                        <span className="font-bold">👁️ Observez : </span>{step.observation}
                                    </div>
                                )}
                                {step.mockup && <DynamicSVGDiagram type={step.mockup} />}
                                {step.cli && step.cli.length > 0 && (
                                    <div className="ml-8 rounded-lg overflow-hidden border border-slate-700">
                                        <div className="bg-slate-800 px-3 py-1 text-[10px] font-bold uppercase text-slate-300">Méthode 2 — ligne de commande (équivalent)</div>
                                        <pre className="bg-slate-950 p-3 text-[11px] text-emerald-400 font-mono whitespace-pre-wrap break-words leading-relaxed">{step.cli.join('\n')}</pre>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Approfondissement pédagogique (deepDive) : théorie étendue, commandes intégrées, encadrés pro */}
                {course.deepDive && course.deepDive.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-xs uppercase font-bold text-brand-500 tracking-wider">Approfondissement - lecture étendue et pratique</h3>
                        {course.deepDive.map((b, bi) => (
                            <div key={bi} className="space-y-2">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-4 rounded bg-brand-500 inline-block"></span>
                                    {b.t}
                                </h4>
                                {(b.p || []).map((par, pi) => (
                                    <p key={pi} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-4">{par}</p>
                                ))}
                                {b.cmd && b.cmd.length > 0 && (
                                    <div className="ml-4 rounded-lg overflow-hidden border border-slate-700">
                                        <div className="bg-slate-800 px-3 py-1 text-[10px] font-bold uppercase text-slate-300">En pratique — commandes à exécuter (VM ou labo)</div>
                                        <pre className="bg-slate-950 p-3 text-[11px] text-emerald-400 font-mono whitespace-pre-wrap break-words leading-relaxed">{b.cmd.join('\n')}</pre>
                                    </div>
                                )}
                                {b.box && (
                                    <div className={`ml-4 p-3 rounded-lg border text-xs leading-relaxed ${
                                        b.box === 'remember' ? 'bg-sky-500/10 border-sky-500/30 text-sky-800 dark:text-sky-200' :
                                        b.box === 'warn' ? 'bg-red-500/10 border-red-500/30 text-red-800 dark:text-red-200' :
                                        b.box === 'admin' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200' :
                                        'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200'
                                    }`}>
                                        <span className="font-bold uppercase text-[10px] block mb-1">
                                            {b.box === 'remember' ? '📌 À retenir' : b.box === 'warn' ? '⚠️ Erreur fréquente' : b.box === 'admin' ? '🛡️ Conseil d’administrateur' : '💼 Cas d’entreprise'}
                                        </span>
                                        {b.boxText}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Exercices */}
                <div className="space-y-3">
                    <h3 className="text-xs uppercase font-bold text-brand-500 tracking-wider">Exercices pratiques — cherchez d'abord, révélez ensuite</h3>
                    {course.exercices.map((ex, i) => (
                        <ExerciseItem key={i} ex={ex} num={i + 1} />
                    ))}
                </div>

                {/* Résumé */}
                <div className="p-4 bg-sky-500/5 border border-sky-500/20 rounded-lg space-y-2">
                    <h3 className="text-xs uppercase font-bold text-sky-600 dark:text-sky-400">Résumé du CP</h3>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{course.resume}</p>
                    {course.suite && (
                        <p className="text-xs text-brand-600 dark:text-sky-300 font-semibold">→ Suite du parcours : {course.suite}</p>
                    )}
                </div>

                {/* Renvois supprimés : QCM, Labos, Commandes et Glossaire restent dans la navigation principale */}


                {/* Navigation entre CP */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-3 justify-between items-center">
                    <button
                        disabled={!prev}
                        onClick={() => prev && onGoTo(prev)}
                        className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        ← Cours précédent{prev ? ` : ${prev.parcours} ${prev.code}` : ''}
                    </button>
                    <button
                        disabled={!next}
                        onClick={() => next && onGoTo(next)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                            next
                                ? 'bg-brand-600 text-white hover:bg-brand-700'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                        } disabled:opacity-40`}
                    >
                        {next ? `Cours suivant : ${next.parcours} ${next.code} →` : 'Fin du parcours à leçons ✓'}
                    </button>
                </div>
            </div>
        );

        // --- COMPOSANT APPLICATION PRINCIPALE ---
        function App() {
            const savedExamDate = localStorage.getItem('tssr_exam_date');
            const savedDarkMode = localStorage.getItem('tssr_dark_mode');

            const [currentTab, setCurrentTab] = useState('dashboard');
            const ccnaVersion = 'v2.0'; // Version unique : distinction v1.1/v2.0 supprimée
            const [examDate, setExamDate] = useState(savedExamDate || '2027-02-15');
            const [darkMode, setDarkMode] = useState(savedDarkMode !== 'false');
            const [fontScale, setFontScale] = useState(localStorage.getItem('tssr_font_scale') || '100'); // FONC-22
            const [searchQuery, setSearchQuery] = useState('');
            const [selectedCourse, setSelectedCourse] = useState(COURSES_DATA[0]);
            const [courseFilter, setCourseFilter] = useState('ALL'); // 'ALL', 'CCNA', 'TSSR', 'AIS'
            const [qcmFilter, setQcmFilter] = useState('ALL'); // 'ALL' ou code de sujet (ex : '1.3') ou 'CCNA'


            // États de recherche indépendants pour chaque onglet distinct
            const [glossarySearch, setGlossarySearch] = useState('');
            const [cheatSheetSearch, setCheatSheetSearch] = useState('');
            const [vocabSearch, setVocabSearch] = useState('');
            const [vocabCat, setVocabCat] = useState('Tous');
            const [cmdSys, setCmdSys] = useState('Tous');
            const [cmdFavorites, setCmdFavorites] = useState(() => {
                try { return new Set(JSON.parse(localStorage.getItem('tssr_cmd_favorites') || '[]')); } catch (e) { return new Set(); }
            });
            const toggleCmdFavorite = (id) => {
                setCmdFavorites(prev => {
                    const n = new Set(prev);
                    if (n.has(id)) n.delete(id); else n.add(id);
                    try { localStorage.setItem('tssr_cmd_favorites', JSON.stringify([...n])); } catch (e) {}
                    return n;
                });
            };
            const [copiedCmd, setCopiedCmd] = useState(null);
            const copyCmd = (el, id) => {
                const txt = (el.ex || el.cmd || '').toString();
                const done = () => { setCopiedCmd(id); setTimeout(() => setCopiedCmd(c => (c === id ? null : c)), 1600); };
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(txt).then(done).catch(() => {
                        try { const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); done(); } catch (e2) {}
                    });
                } else {
                    try { const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); done(); } catch (e) {}
                }
            };
            const [glossCertif, setGlossCertif] = useState('Tous'); // FONC-12 : filtre par certification
            const [labParcours, setLabParcours] = useState('Tous');
            const [labLevel, setLabLevel] = useState('Tous');
            const [labSearch, setLabSearch] = useState('');
            const [selectedDepId, setSelectedDepId] = useState(''); // Centre de dépannage : problème choisi dans la liste déroulante
            // --- Les Indispensables ---
            const [essTab, setEssTab] = useState('ports'); // ports | commandes | adresses | cidr | http | outils
            const [essPortSearch, setEssPortSearch] = useState('');
            const [essPortProto, setEssPortProto] = useState('Tous');
            const [essPortFavs, setEssPortFavs] = useState(() => {
                try { return JSON.parse(localStorage.getItem('ess_port_favs') || '[]'); } catch (e) { return []; }
            });
            const [essOs, setEssOs] = useState('Windows');
            const [essCat, setEssCat] = useState('Toutes');
            const [portQuiz, setPortQuiz] = useState(() => {
                const pool = PORTS_DATA.filter(p => p.port);
                const q = pool[Math.floor(Math.random() * pool.length)];
                const others = pool.filter(p => p !== q).sort(() => Math.random() - 0.5).slice(0, 3);
                const opts = [...others, q].sort(() => Math.random() - 0.5);
                return { q, opts, done: false, chosen: null, streak: 0 };
            });
            const [scriptsOs, setScriptsOs] = useState('Windows');
            const [scriptsSearch, setScriptsSearch] = useState('');
            const [dashSeed, setDashSeed] = useState(0); // actualisation des indispensables du jour
            const [modsOpen, setModsOpen] = useState(false); // liste des modules repliée sur mobile
            const [subCidr, setSubCidr] = useState({ ip: '192.168.10.70', pfx: 26 });
            const [subVlsm, setSubVlsm] = useState({ base: '192.168.20.0/24', hosts: '60, 25, 10, 2, 2' });
            const [subV6, setSubV6] = useState({ addr: '2001:db8:1::a1:0:0:1', mac: '00:1A:2B:3C:4D:5E' });
            const [subHex, setSubHex] = useState({ dec: '255', hex: 'FF' });
            const subVlsmResult = useMemo(() => {
                const base = subVlsm.base.trim();
                const bm = base.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/(\d{1,2})$/);
                if (!bm) return { error: 'Base invalide (format x.x.x.x/préfixe)' };
                const bIp = bm[1].split('.').map(Number);
                const bPfx = Number(bm[2]);
                if (bPfx < 8 || bPfx > 30) return { error: 'Préfixe de base entre /8 et /30' };
                const bSize = Math.pow(2, 32 - bPfx);
                const bInt = ((bIp[0] << 24) >>> 0) + (bIp[1] << 16) + (bIp[2] << 8) + bIp[3];
                const bNet = Math.floor(bInt / bSize) * bSize;
                const toIp = (n) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
                const hosts = subVlsm.hosts.split(/[;,]+/).map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);
                if (hosts.length === 0) return { error: 'Aucun besoin valide (séparer par des virgules)' };
                const sorted = [...hosts].sort((a, b) => b - a);
                let cur = bNet;
                const rows = sorted.map(h => {
                    const need = h + 2; let pfx = 32;
                    while (pfx > 0 && Math.pow(2, 32 - pfx) < need) pfx--;
                    const size = Math.pow(2, 32 - pfx);
                    const start = Math.ceil(cur / size) * size;
                    const row = { h, pfx, network: toIp(start), first: toIp(start + 1), last: toIp(start + size - 2), broadcast: toIp(start + size - 1) };
                    cur = start + size;
                    return row;
                });
                return { rows, remaining: bSize - (cur - bNet), nextFree: toIp(cur) };
            }, [subVlsm]);
            const [selectedLabId, setSelectedLabId] = useState(null);
            const [labChecklist, setLabChecklist] = useState(() => {
                try { return JSON.parse(localStorage.getItem('tssr_lab_checklist') || '{}'); } catch (e) { return {}; }
            });
            const toggleLabStep = (labId, stepNum) => {
                setLabChecklist(prev => {
                    const done = new Set(prev[labId] || []);
                    if (done.has(stepNum)) done.delete(stepNum); else done.add(stepNum);
                    const next = { ...prev, [labId]: [...done] };
                    try { localStorage.setItem('tssr_lab_checklist', JSON.stringify(next)); } catch (e) {}
                    return next;
                });
            };
            const [labDone, setLabDone] = useState(() => {
                try { return new Set(JSON.parse(localStorage.getItem('tssr_lab_done') || '[]')); } catch (e) { return new Set(); }
            });
            const toggleLabDone = (labId) => {
                setLabDone(prev => {
                    const n = new Set(prev);
                    if (n.has(labId)) n.delete(labId); else n.add(labId);
                    try { localStorage.setItem('tssr_lab_done', JSON.stringify([...n])); } catch (e) {}
                    return n;
                });
            };
            // Normalisation des catégories du vocabulaire
            const normVocabType = (t) => ({
                "CCNA v2.0": "Cisco",
                "Conteneurs": "DevOps",
                "Windows": "Windows Server",
                "Système": "Linux",
                "Sécurité": "Cybersécurité"
            })[t] || t;
            const [logoError, setLogoError] = useState(false);

            const [progress, setProgress] = useState(() => {
                const saved = localStorage.getItem('tssr_ais_ccna_progress_v2');
                return saved ? JSON.parse(saved) : { completedModules: [], qcmScores: {}, notes: {} };
            });

            useEffect(() => {
                localStorage.setItem('tssr_ais_ccna_progress_v2', JSON.stringify(progress));
            }, [progress]);

            useEffect(() => {
                if (darkMode) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
                localStorage.setItem('tssr_dark_mode', String(darkMode));
            }, [darkMode]);

            useEffect(() => {
                localStorage.setItem('ccna_version', ccnaVersion);
            }, []);

            useEffect(() => {
                document.documentElement.style.fontSize = fontScale + '%';
                localStorage.setItem('tssr_font_scale', fontScale);
            }, [fontScale]);

            // Filtre de la banque QCM : par sujet lié au cours, par certification (version CCNA choisie), ou tout
            const filteredQcm = useMemo(() => {
                if (qcmFilter === 'ALL') return QCM_DATA;
                if (qcmFilter === 'CCNA') return QCM_DATA.filter(q => q.certif && q.certif === 'CCNA');
                return QCM_DATA.filter(q => q.cp === qcmFilter);
            }, [qcmFilter, ccnaVersion]);

            const qcmFilterOptions = useMemo(() => {
                const seen = new Set();
                const options = [{ value: 'ALL', label: 'Toutes les questions' }, { value: 'CCNA', label: 'CCNA ' + ccnaVersion }];
                QCM_DATA.forEach(q => {
                    if (!seen.has(q.cp)) {
                        seen.add(q.cp);
                        options.push({ value: q.cp, label: `Sujet ${q.cp}` });
                    }
                });
                return options;
            }, []);


            const filteredCourses = useMemo(() => {
                return ALL_MODULE_ENTRIES.filter(c => {
                    // Filtrage par parcours sélectionné si activé
                    if (courseFilter === 'CCNA' && !c.parcours.startsWith('CCNA')) return false;
                    if (courseFilter === 'TSSR' && c.parcours !== 'TSSR') return false;
                    if (courseFilter === 'AIS' && c.parcours !== 'AIS') return false;
                    // FONC-03 : dans « Tous les parcours », n'afficher que la version CCNA sélectionnée
                    if (c.parcours && c.parcours.startsWith('CCNA') && c.parcours !== 'CCNA') return false;

                    if (searchQuery) {
                        const q = normText(searchQuery);
                        const text = [
                            c.title, c.code, c.why,
                            ...(c.keywords || []),
                            ...(c.lessons || []).map(l => [l.title, l.objectives && l.objectives.join(' '), l.content && (typeof l.content === 'string' ? l.content : JSON.stringify(l.content))].join(' ')),
                            ...(c.steps || []).map(s => [s.title, s.why, s.cli, s.gui].join(' ')),
                            ...(c.schemas || []).map(s => s.title)
                        ].join(' ');
                        return normText(text).includes(q);
                    }
                    return true;
                });
            }, [courseFilter, searchQuery, ccnaVersion]);

            // Aide au résultat : précise si le terme cherché existe dans les autres rubriques (Glossaire / Commandes / Vocabulaire)
            const searchHints = useMemo(() => {
                if (!searchQuery) return null;
                const q = normText(searchQuery);
                return {
                    inGloss: GLOSSARY_DATA.filter(g => [g.term, g.en, g.def].some(t => normText(t).includes(q))).length,
                    inCmds: CHEAT_SHEETS.reduce((n, s) => n + s.commands.filter(c => [c.cmd, c.desc].some(t => normText(t).includes(q))).length, 0),
                    inVocab: ENGLISH_VOCAB.filter(v => [v.en, v.fr, v.exEn].some(t => normText(t).includes(q))).length
                };
            }, [searchQuery]);

            // Ordre des cours à leçons (TSSR CP1→CP9 puis AIS CP1→CP10) pour la navigation précédent/suivant
            const lessonCourses = ALL_MODULE_ENTRIES.filter(c => c.lessons);
            const lessonIdx = lessonCourses.findIndex(c => c.id === selectedCourse.id);
            const prevLesson = lessonIdx > 0 ? lessonCourses[lessonIdx - 1] : null;
            const nextLesson = lessonIdx >= 0 && lessonIdx < lessonCourses.length - 1 ? lessonCourses[lessonIdx + 1] : null;

            // Navigation précédent/suivant sur toutes les fiches, y compris CCNA (FONC-25)
            const entryIdx = ALL_MODULE_ENTRIES.findIndex(c => c.id === selectedCourse.id);
            const prevEntry = entryIdx > 0 ? ALL_MODULE_ENTRIES[entryIdx - 1] : null;
            const nextEntryEntry = entryIdx >= 0 && entryIdx < ALL_MODULE_ENTRIES.length - 1 ? ALL_MODULE_ENTRIES[entryIdx + 1] : null;

            // Prochaine étape conseillée (FONC-01) : premier module non encore marqué « acquis »
            const suggestedNext = ALL_MODULE_ENTRIES.find(c => !progress.completedModules.includes(c.id)) || ALL_MODULE_ENTRIES[0];

            // Enregistrement du score d'une session QCM par compétence / domaine (FONC-15)
            const recordQcmSession = (perCp) => {
                if (!perCp || Object.keys(perCp).length === 0) return;
                setProgress(prev => {
                    const scores = { ...(prev.qcmScores || {}) };
                    Object.entries(perCp).forEach(([cp, r]) => {
                        const cur = scores[cp] || { correct: 0, total: 0 };
                        scores[cp] = { correct: cur.correct + r.correct, total: cur.total + r.total };
                    });
                    return { ...prev, qcmScores: scores };
                });
            };

            // Export / import / effacement de la progression (FONC-16, NF-10)
            const exportProgress = () => {
                try {
                    const errors = JSON.parse(localStorage.getItem('tssr_qcm_errors') || '[]');
                    const data = JSON.stringify({
                        site: 'plateforme-tssr-ais-ccna',
                        exportedAt: new Date().toISOString(),
                        progress,
                        examDate,
                        ccnaVersion,
                        qcmErrors: errors
                    }, null, 2);
                    const blob = new Blob([data], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'progression_tssr_ais_ccna.json';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                } catch (e) {
                    window.alert('L\'export a échoué : ' + e.message);
                }
            };

            const importProgress = (file) => {
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        const parsed = JSON.parse(reader.result);
                        if (!parsed || typeof parsed !== 'object' || !parsed.progress) {
                            throw new Error('fichier invalide (progression introuvable)');
                        }
                        setProgress({ completedModules: [], qcmScores: {}, notes: {}, ...(parsed.progress) });
                        if (parsed.examDate) setExamDate(parsed.examDate);
                        if (parsed.ccnaVersion === 'v1.1' || parsed.ccnaVersion === 'v2.0') setCcnaVersion(parsed.ccnaVersion);
                        if (Array.isArray(parsed.qcmErrors)) {
                            localStorage.setItem('tssr_qcm_errors', JSON.stringify(parsed.qcmErrors));
                        }
                        window.alert('Progression importée avec succès.');
                    } catch (e) {
                        window.alert('Import impossible : ' + e.message);
                    }
                };
                reader.readAsText(file);
            };

            const eraseProgress = () => {
                if (!window.confirm('Effacer toute la progression (modules acquis, scores, erreurs) ? Cette action est irréversible.')) return;
                setProgress({ completedModules: [], qcmScores: {}, notes: {} });
                try {
                    localStorage.removeItem('tssr_qcm_errors');
                    localStorage.removeItem('tssr_exam_date');
                } catch (e) { /* stockage indisponible */ }
                window.alert('Progression effacée de cet appareil.');
            };

            // Signalement d'erreur (FONC-20) : copie un récapitulatif dans le presse-papiers
            const reportIssue = () => {
                const page = selectedCourse ? ('cours ' + selectedCourse.parcours + ' ' + selectedCourse.code + ' — ' + selectedCourse.title) : ('onglet ' + currentTab);
                const txt = 'Signalement d\'erreur — Plateforme TSSR/AIS/CCNA\nPage : ' + page + '\nFait le : ' + new Date().toLocaleDateString('fr-FR') + '\nErreur constatée : (décrivez ici)';
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(txt).then(
                        () => window.alert('Le récapitulatif du signalement est copié. Collez-le dans un e-mail ou un bloc-notes pour l\'envoyer.'),
                        () => window.alert('Copie impossible dans ce navigateur. Détails :\n' + txt)
                    );
                } else {
                    window.alert('Copie impossible dans ce navigateur. Détails :\n' + txt);
                }
            };

            // Remonte en haut de page à chaque changement de cours
            useEffect(() => {
                window.scrollTo(0, 0);
            }, [selectedCourse.id]);

            const toggleModuleComplete = (id) => {
                setProgress(prev => {
                    const completed = prev.completedModules.includes(id)
                        ? prev.completedModules.filter(mId => mId !== id)
                        : [...prev.completedModules, id];
                    return { ...prev, completedModules: completed };
                });
            };

            // Rendu Tableau de bord / Dashboard
            const renderDashboard = () => {
                // Progression par parcours
                const parcoursStats = [
                    { key: 'TSSR', nom: 'Titre Pro TSSR', badge: 'TP-01351 · Niveau 5', badgeClass: 'text-sky-500', desc: "Technicien supérieur systèmes et réseaux : support utilisateur, Windows/AD, Linux, services réseau, virtualisation, sécurité, sauvegardes, déploiement.", premierId: 'tssr-cp1', icon: 'servers', total: ALL_MODULE_ENTRIES.filter(c => c.parcours === 'TSSR').length },
                    { key: 'AIS', nom: 'Titre Pro AIS', badge: 'TP-01352 · Niveau 6', badgeClass: 'text-emerald-500', desc: "Administrateur d'infrastructures sécurisées : conception, administration système/réseau avancée, production et supervision.", premierId: 'ais-cp1', icon: 'shield', total: ALL_MODULE_ENTRIES.filter(c => c.parcours === 'AIS').length },
                    { key: 'CCNA', nom: 'CCNA 200-301', badge: 'Cisco Certification', badgeClass: 'text-purple-500', desc: "Certification Cisco : réseaux, routage, commutation, sans fil, services IP, sécurité et automatisation — orienté terrain et examen.", premierId: 'ccna-v2-1-1', icon: 'network', total: ALL_MODULE_ENTRIES.filter(c => c.parcours === 'CCNA').length }
                ].map(p => ({ ...p, done: progress.completedModules.filter(id => { const c = ALL_MODULE_ENTRIES.find(x => x.id === id); return c && c.parcours === p.key; }).length }));
                const ParcoursIcon = ({ name }) => (
                    name === 'servers' ? (
                        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="7" rx="1.5" /><rect x="3" y="14" width="18" height="7" rx="1.5" /><circle cx="7" cy="6.5" r="0.9" fill="currentColor" /><circle cx="7" cy="17.5" r="0.9" fill="currentColor" /><path d="M11 6.5h6M11 17.5h6" /></svg>
                    ) : name === 'shield' ? (
                        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3l7.5 3v5.5c0 4.5-3.1 8-7.5 9.5C7.6 19.5 4.5 16 4.5 11.5V6L12 3z" /><path d="M9 12l2.2 2.2L15.5 10" /></svg>
                    ) : (
                        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="5.5" cy="6" r="2.4" /><circle cx="18.5" cy="6" r="2.4" /><circle cx="12" cy="18.5" r="2.4" /><path d="M7.6 7.4l3 8.9M16.4 7.4l-3 8.9M7.9 6h8.2" /></svg>
                    )
                );
                // Indispensables du jour (index de l'année + seed d'actualisation)
                const now = new Date();
                const doy = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000) + dashSeed * 7919;
                const cmdWin = ESSENTIALS_COMMANDS.filter(g => g.os === 'Windows').flatMap(g => g.items)[doy % ESSENTIALS_COMMANDS.filter(g => g.os === 'Windows').flatMap(g => g.items).length];
                const cmdLin = ESSENTIALS_COMMANDS.filter(g => g.os === 'Linux').flatMap(g => g.items)[doy % ESSENTIALS_COMMANDS.filter(g => g.os === 'Linux').flatMap(g => g.items).length];
                const portJour = PORTS_DATA[doy % PORTS_DATA.length];
                const psTip = PS_TIPS[doy % PS_TIPS.length];
                const ccnaQcm = QCM_DATA.filter(q => q.certif === 'CCNA');
                const qJour = ccnaQcm[doy % ccnaQcm.length];
                const steps = [
                    { n: 1, icon: '📚', titre: 'Cours & Fiches', desc: 'Lire les leçons pas à pas', go: () => setCurrentTab('courses') },
                    { n: 2, icon: '⌨️', titre: 'Commandes essentielles', desc: 'La trousse Windows / Linux / Cisco', go: () => setCurrentTab('commands') },
                    { n: 3, icon: '🛠️', titre: 'Les Indispensables', desc: 'Ports, CIDR, HTTP, outils du quotidien', go: () => setCurrentTab('essentiels') },
                    { n: 4, icon: '💻', titre: 'Scripts Windows/Linux', desc: 'Automatiser les tâches récurrentes', go: () => setCurrentTab('scripts') },
                    { n: 5, icon: '🧪', titre: 'Labos guidés', desc: 'Pratiquer sur Packet Tracer / VM', go: () => setCurrentTab('labs') },
                    { n: 6, icon: '✍️', titre: 'Banque QCM', desc: 'Se tester, réponse par réponse', go: () => setCurrentTab('qcm') }
                ];
                return (
                    <div className="space-y-6">
                        {/* ===== 1. MES PARCOURS DE FORMATION (premier bloc visible) ===== */}
                        <div className="fade-up">
                            <div className="flex items-center gap-3 mb-3">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">🎓 Mes parcours de formation</h2>
                                <span className="text-[11px] text-slate-500 dark:text-slate-400">{progress.completedModules.length} cours marqués acquis sur {ALL_MODULE_ENTRIES.length}</span>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                                {parcoursStats.map(p => {
                                    const pct = p.total > 0 ? Math.round((p.done / p.total) * 100) : 0;
                                    return (
                                        <div key={p.key} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3 hover:shadow-md hover:border-brand-500/40 transition-all">
                                            <div className="flex justify-between items-start">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${p.badgeClass} bg-slate-100 dark:bg-slate-900/70`}>
                                                    <ParcoursIcon name={p.icon} />
                                                </div>
                                                <span className={`text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-900/70 px-2 py-0.5 rounded ${p.badgeClass}`}>{p.badge}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{p.nom}</h3>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{p.desc}</p>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                                                    <span>Avancement</span><span>{p.done} / {p.total} · {pct} %</span>
                                                </div>
                                                <div className="h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-sky-400 transition-all" style={{ width: pct + '%' }}></div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => { const c = ALL_MODULE_ENTRIES.find(x => x.id === p.premierId); if (c) setSelectedCourse(c); setCourseFilter(p.key); setCurrentTab('courses'); }}
                                                className="w-full py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-colors"
                                            >
                                Accéder →
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ===== 2. BANNER CENTRAL ===== */}
                        <div className="fade-up-2 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
                            <img src={bannerImg} alt="Infrastructure réseau et datacenter" className="w-full h-40 md:h-56 object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-slate-900/30 flex flex-col justify-center px-6 md:px-10">
                                <h2 className="text-xl md:text-2xl font-bold text-white leading-tight max-w-xl">Plateforme de révision Systèmes, Réseaux, Cybersécurité et CCNA</h2>
                                <p className="text-sky-300 text-sm md:text-base font-semibold mt-1.5">Révisez, pratiquez et réussissez vos certifications.</p>
                            </div>
                        </div>

                        {/* ===== 3. LES INDISPENSABLES DU JOUR ===== */}
                        <div className="fade-up-3 bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                            <div className="flex flex-wrap justify-between items-center gap-2">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Les indispensables du jour</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} — cinq pépites terrain renouvelées chaque jour.</p>
                                </div>
                                <button onClick={() => setDashSeed(s => s + 1)} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">🔄 Actualiser</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-1.5 fade-up">
                                    <span className="text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 block">🪟 Commande Windows du jour</span>
                                    <code className="block text-[11px] font-mono text-emerald-700 dark:text-emerald-400 break-all bg-slate-950/90 text-emerald-400 p-2 rounded">{cmdWin.c}</code>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">💡 {cmdWin.d}</p>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-1.5 fade-up-2">
                                    <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 block">🐧 Commande Linux du jour</span>
                                    <code className="block text-[11px] font-mono text-emerald-700 dark:text-emerald-400 break-all bg-slate-950/90 text-emerald-400 p-2 rounded">{cmdLin.c}</code>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">💡 {cmdLin.d}</p>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-1.5 fade-up-2">
                                    <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block">🔌 Port réseau du jour</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-black font-mono text-slate-900 dark:text-white">{portJour.port}</span>
                                        <span className="text-[10px] text-slate-500 font-mono">/{portJour.proto}</span>
                                    </div>
                                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{portJour.service}</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">💡 {portJour.desc}</p>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-1.5 fade-up-3">
                                    <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">⚡ Astuce PowerShell du jour</span>
                                    <code className="block text-[11px] font-mono text-slate-700 dark:text-slate-300 break-all bg-slate-950/90 text-emerald-400 p-2 rounded">{psTip}</code>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-1.5 md:col-span-2 xl:col-span-1 fade-up-3">
                                    <span className="text-[10px] uppercase font-bold text-brand-600 dark:text-brand-400 block">🎯 Question réseau du jour</span>
                                    <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">{qJour.question}</p>
                                    <details>
                                        <summary className="cursor-pointer text-[10px] font-bold text-brand-500">Afficher la correction</summary>
                                        <ul className="mt-1 space-y-0.5">
                                            {qJour.options.map((o, i) => (
                                                <li key={i} className={`text-[10px] ${o.correct ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>{o.correct ? '✔' : '✕'} {o.text}</li>
                                            ))}
                                        </ul>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">💡 {qJour.options.find(o => o.correct) ? qJour.options.find(o => o.correct).exp : ''}</p>
                                    </details>
                                </div>
                            </div>
                        </div>

                        {/* ===== 4. PARCOURS CONSEILLÉ ===== */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">PARCOURS CONSEILLÉ</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Le chemin de montée en compétences d'un technicien, du support à l'administration réseau — chaque étape est cliquable.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {steps.map(s => (
                                    <button key={s.n} onClick={s.go} className="group flex items-start gap-3 p-3 text-left bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-500/50 hover:bg-brand-500/5 transition-all">
                                        <span className="w-9 h-9 rounded-lg bg-brand-600 text-white font-black text-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">{s.n}</span>
                                        <div>
                                            <span className="text-xs font-bold text-slate-900 dark:text-white block">{s.icon} {s.titre}</span>
                                            <span className="text-[11px] text-slate-500 dark:text-slate-400">{s.desc}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            };

            // Rendu Fiches de Cours
            const renderCourses = () => (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Barre latérale des cours */}
                    <div className={`order-2 lg:order-1 lg:col-span-1 space-y-2 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] overflow-y-auto self-start ${modsOpen ? '' : 'hidden lg:block'}`}>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Modules</h3>
                            <select
                                value={courseFilter}
                                onChange={(e) => setCourseFilter(e.target.value)}
                                className="bg-slate-100 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700 px-1.5 py-0.5"
                            >
                                <option value="ALL">Tous les parcours</option>
                                <option value="CCNA">CCNA 200-301</option>
                                <option value="TSSR">TSSR</option>
                                <option value="AIS">AIS</option>
                            </select>
                        </div>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed mb-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                            💡 Suivez l'ordre des fiches : 1.1 → 1.7 pour le CCNA, CP1 → CP9 pour le TSSR, CP1 → CP10 pour l'AIS. Chaque fiche s'appuie sur la précédente.
                        </p>
                        {filteredCourses.map(c => {
                            const isSelected = selectedCourse.id === c.id;
                            const isDone = progress.completedModules.includes(c.id);
                            return (
                                <button
                                    key={c.id}
                                    onClick={() => { setSelectedCourse(c); setModsOpen(false); }}
                                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                                        isSelected
                                            ? 'bg-brand-600 text-white font-semibold'
                                            : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                                    }`}
                                >
                                    <div className="truncate pr-2">
                                        <span className="font-mono text-[10px] opacity-80 mr-1">[{c.parcours}] {c.code}</span>
                                        <div className="truncate font-medium">{c.title}</div>
                                    </div>
                                    {c.isPlaceholder ? (
                                        <span className="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded whitespace-nowrap">À venir</span>
                                    ) : (
                                        isDone && <span className="text-emerald-400 font-bold">✓</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Bascule mobile : la liste des modules se replie sous le contenu sur téléphone */}
                    <button onClick={() => setModsOpen(o => !o)} className="order-1 lg:hidden w-full flex items-center justify-between p-3 rounded-xl bg-brand-600 text-white text-xs font-bold shadow">
                        <span>📚 {modsOpen ? 'Masquer' : 'Afficher'} les modules de cours</span>
                        <span className="font-mono text-[10px] opacity-80">{filteredCourses.length} fiches · en cours : {selectedCourse.parcours} {selectedCourse.code}</span>
                    </button>

                    {/* Contenu principal de la fiche de cours */}
                    <div className="order-3 lg:order-2 lg:col-span-3 space-y-6">
                        {selectedCourse ? (
                            selectedCourse.isPlaceholder ? (
                                <div className="bg-white dark:bg-slate-800 rounded-xl p-12 border border-slate-200 dark:border-slate-700 shadow-sm text-center space-y-4">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center text-2xl font-bold">
                                        ⏳
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Contenu à venir</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                                        Le cours pour la compétence <strong className="text-slate-800 dark:text-slate-200">[{selectedCourse.parcours}] {selectedCourse.code} - {selectedCourse.title}</strong> n'a pas encore été rédigé ni validé.
                                    </p>
                                </div>
                            ) : selectedCourse.lessons ? (
                                <LessonCourseView
                                    course={selectedCourse}
                                    isDone={progress.completedModules.includes(selectedCourse.id)}
                                    onToggleDone={() => toggleModuleComplete(selectedCourse.id)}
                                    prev={prevLesson}
                                    next={nextLesson}
                                    onGoTo={(c) => setSelectedCourse(c)}
                                    onOpenTab={setCurrentTab}
                                />
                            ) : (
                                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
                                    {/* 1. Compétence visée */}
                                    <div className="border-b border-slate-200 dark:border-slate-700 pb-4 flex flex-wrap gap-3 justify-between items-start">
                                        <div>
                                            <div className="flex items-center flex-wrap gap-2">
                                                <span className="px-2.5 py-0.5 bg-brand-500/10 text-brand-500 text-xs font-mono font-bold rounded">
                                                    {selectedCourse.code}
                                                </span>
                                                <span className="text-xs text-slate-400 font-mono">Parcours : {selectedCourse.parcours}</span>
                                                {selectedCourse.niveau && (
                                                    <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                                        Niveau : {selectedCourse.niveau}
                                                    </span>
                                                )}
                                            </div>
                                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{selectedCourse.title}</h2>
                                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                                                🏷️ {versionLabel(selectedCourse.parcours)} · Contenu vérifié le {CONTENT_LAST_CHECK}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => toggleModuleComplete(selectedCourse.id)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                                                progress.completedModules.includes(selectedCourse.id)
                                                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                            }`}
                                        >
                                            {progress.completedModules.includes(selectedCourse.id) ? '✓ Acquis' : 'Marquer comme acquis'}
                                        </button>
                                    </div>

                                    {/* Objectifs & Prérequis */}
                                    <div className="space-y-3">
                                        <h3 className="text-xs uppercase font-bold text-brand-500 tracking-wider">0. Objectifs et prérequis</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="p-3 bg-sky-500/5 rounded-lg border border-sky-500/20">
                                                <span className="text-[11px] font-bold uppercase text-sky-600 dark:text-sky-400 block mb-1.5">🎯 À la fin de ce cours, vous saurez :</span>
                                                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                                                    {selectedCourse.objectifs.map((obj, idx) => (
                                                        <li key={idx} className="flex items-start gap-2">
                                                            <span className="text-sky-500 font-bold">✓</span>
                                                            <span>{obj}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800">
                                                <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1.5">🧭 Prérequis</span>
                                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{selectedCourse.prerequis}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2. Pourquoi */}
                                    <div className="space-y-1">
                                        <h3 className="text-xs uppercase font-bold text-brand-500 tracking-wider">1. Pourquoi cette notion ?</h3>
                                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                            {selectedCourse.why}
                                        </p>
                                    </div>

                                    {/* 3. Idées clés */}
                                    <div className="space-y-2">
                                        <h3 className="text-xs uppercase font-bold text-brand-500 tracking-wider">2. Idées clés & Comparaison</h3>
                                        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                                            {selectedCourse.keyIdeas.map((idea, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <span className="text-brand-500 font-bold">•</span>
                                                    <span>{idea}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* 4. Schéma généré par le site */}
                                    <div className="space-y-2">
                                        <h3 className="text-xs uppercase font-bold text-brand-500 tracking-wider">3. Schéma technique vectoriel (SVG)</h3>
                                        <DynamicSVGDiagram type={selectedCourse.schemaType} />
                                    </div>

                                    {/* 5. Manipulation graphique */}
                                    <div className="space-y-2">
                                        <h3 className="text-xs uppercase font-bold text-brand-500 tracking-wider">4. Procedure Interface Graphique (GUI)</h3>
                                        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                                            {selectedCourse.guiProcedure}
                                        </div>
                                    </div>

                                    {/* 6. Équivalent en ligne de commande */}
                                    <div className="space-y-2">
                                        <h3 className="text-xs uppercase font-bold text-brand-500 tracking-wider">5. Ligne de Commande (CLI)</h3>
                                        <div className="space-y-2">
                                            {selectedCourse.cliProcedure.map((cmdObj, idx) => (
                                                <div key={idx} className="bg-slate-950 p-3 rounded-lg text-xs font-mono border border-slate-800">
                                                    <div className="text-emerald-400 font-bold">$ {cmdObj.cmd}</div>
                                                    <div className="text-slate-400 text-[11px] mt-1">→ {cmdObj.desc}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 7. Vérification */}
                                    <div className="space-y-2">
                                        <h3 className="text-xs uppercase font-bold text-brand-500 tracking-wider">6. Vérification du résultat</h3>
                                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs space-y-1">
                                            <div className="font-mono text-emerald-700 dark:text-emerald-300">Commande : {selectedCourse.verification.cmd}</div>
                                            <div className="text-slate-600 dark:text-slate-400">Résultat attendu : {selectedCourse.verification.expected}</div>
                                        </div>
                                    </div>

                                    {/* 8. Pièges fréquents */}
                                    <div className="space-y-2">
                                        <h3 className="text-xs uppercase font-bold text-rose-500 tracking-wider">7. Pièges fréquents & Erreurs à éviter</h3>
                                        <ul className="space-y-1 text-xs text-rose-700 dark:text-rose-300 bg-rose-500/5 p-3 rounded-lg border border-rose-500/20">
                                            {selectedCourse.pitfalls.map((pitfall, idx) => (
                                                <li key={idx}>⚠️ {pitfall}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* 9. Vocabulaire Anglais */}
                                    <div className="space-y-2">
                                        <h3 className="text-xs uppercase font-bold text-brand-500 tracking-wider">8. Vocabulaire Technique Anglais</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                            {selectedCourse.vocab.map((v, idx) => (
                                                <div key={idx} className="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-xs">
                                                    <div className="font-bold text-brand-500">{v.en}</div>
                                                    <div className="text-slate-500">{v.fr}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Renvois supprimés : les accès QCM / Labos / Commandes / Glossaire / Vocabulaire
                                        restent disponibles depuis la barre de navigation principale. */}

                                    {/* Navigation précédent / suivant (FONC-25) */}
                                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-3 justify-between items-center">
                                        <button
                                            disabled={!prevEntry}
                                            onClick={() => prevEntry && setSelectedCourse(prevEntry)}
                                            className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                        >
                                            ← Cours précédent{prevEntry ? ` : ${prevEntry.parcours} ${prevEntry.code}` : ''}
                                        </button>
                                        <button
                                            disabled={!nextEntryEntry}
                                            onClick={() => nextEntryEntry && setSelectedCourse(nextEntryEntry)}
                                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                                                nextEntryEntry
                                                    ? 'bg-brand-600 text-white hover:bg-brand-700'
                                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                                            } disabled:opacity-40`}
                                        >
                                            {nextEntryEntry ? `Cours suivant : ${nextEntryEntry.parcours} ${nextEntryEntry.code} →` : 'Fin du catalogue ✓'}
                                        </button>
                                    </div>
                                </div>
                            )
                        ) : null}
                    </div>
                </div>
            );

            // Rendu Banque de QCM (filtrée par sujet ou certification)
            const renderQCM = () => (
                <QcmSection
                    qcmData={filteredQcm}
                    filterLabel={qcmFilter}
                    onFilterChange={setQcmFilter}
                    filterOptions={qcmFilterOptions}
                    showFilter={true}
                    onSessionFinish={recordQcmSession}
                />
            );

            // Rendu des Labos Guidés — bibliothèque filtrable avec progression
            const labLevelBadge = (lvl) => ({
                "Débutant": "bg-emerald-500/10 text-emerald-500",
                "Intermédiaire": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                "Avancé": "bg-red-500/10 text-red-500"
            }[lvl] || "bg-slate-500/10 text-slate-400");
            const labParcoursBadge = (p) => ({
                "TSSR": "bg-sky-500/10 text-sky-500",
                "AIS": "bg-purple-500/10 text-purple-500",
                "CCNA": "bg-brand-500/10 text-brand-500"
            }[p] || "bg-slate-500/10 text-slate-400");
            const renderLabs = () => {
                const filteredLabs = LABS_DATA.filter(l => {
                    if (labParcours !== 'Tous' && l.parcours !== labParcours) return false;
                    if (labLevel !== 'Tous' && l.level !== labLevel) return false;
                    if (labSearch) {
                        const q = normText(labSearch);
                        return normText([l.title, l.objective, l.context, l.prereqs, l.parcours, l.level, (l.tags || []).join(' ')].join(' ')).includes(q);
                    }
                    return true;
                });
                const selLab = LABS_DATA.find(l => l.id === selectedLabId);
                const doneLabs = LABS_DATA.filter(l => labDone.has(l.id)).length;
                /* --- Vue détail d'un labo --- */
                if (selLab) {
                    const stepsDone = new Set(labChecklist[selLab.id] || []);
                    const pct = Math.round((stepsDone.size / selLab.steps.length) * 100);
                    return (
                        <div className="space-y-6">
                            <button onClick={() => setSelectedLabId(null)} className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline no-print">← Retour à la bibliothèque de labos</button>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                                <div className="flex flex-wrap justify-between items-start gap-2">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${labParcoursBadge(selLab.parcours)}`}>{selLab.parcours}</span>
                                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${labLevelBadge(selLab.level)}`}>{selLab.level}</span>
                                            <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-bold rounded-full">Durée : {selLab.duration}</span>
                                            {labDone.has(selLab.id) && <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-500">✓ Terminé</span>}
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selLab.title}</h2>
                                    </div>
                                </div>
                                <div className={`rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 ${labDone.has(selLab.id) ? 'bg-emerald-500/10' : 'bg-slate-100 dark:bg-slate-900/50'}`}>
                                    <div className="h-2 bg-slate-200 dark:bg-slate-700">
                                        <div className="h-2 bg-brand-500 transition-all" style={{ width: `${pct}%` }}></div>
                                    </div>
                                    <div className="flex flex-wrap justify-between items-center px-3 py-2 gap-2">
                                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Progression : {stepsDone.size}/{selLab.steps.length} étapes ({pct}%)</span>
                                        <button onClick={() => toggleLabDone(selLab.id)} className={`px-3 py-1 text-[11px] font-bold rounded ${labDone.has(selLab.id) ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
                                            {labDone.has(selLab.id) ? 'Marquer comme non terminé' : 'Marquer le labo terminé ✓'}
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-700 dark:text-slate-200"><span className="font-bold text-brand-600 dark:text-brand-400">Objectif : </span>{selLab.objective}</p>
                                {selLab.context && <p className="text-xs text-slate-600 dark:text-slate-300 border-l-4 border-brand-500/50 pl-3"><span className="font-bold">Contexte métier : </span>{selLab.context}</p>}
                                <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded p-2">
                                    <span className="font-bold">Prérequis : </span>{selLab.prereqs}
                                </p>
                                {selLab.topology && <p className="text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded text-slate-600 dark:text-slate-300 whitespace-pre-wrap break-words"><span className="font-bold font-sans">Topologie : </span>{selLab.topology}</p>}
                                {selLab.addressPlan && <p className="text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded text-slate-600 dark:text-slate-300">{selLab.addressPlan}</p>}
                                <div className="space-y-4 mt-6">
                                    {selLab.steps.map(step => {
                                        const isDone = stepsDone.has(step.num);
                                        return (
                                            <div key={step.num} className={`p-4 rounded-lg border space-y-3 ${isDone ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700'}`}>
                                                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={isDone}
                                                        onChange={() => toggleLabStep(selLab.id, step.num)}
                                                        aria-label={`Étape ${step.num} terminée`}
                                                        className="w-4 h-4 accent-brand-600"
                                                    />
                                                    <span className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold ${isDone ? 'bg-emerald-500' : 'bg-brand-600'}`}>{step.num}</span>
                                                    {step.title}
                                                </h4>
                                                <p className="text-xs text-slate-600 dark:text-slate-400">{step.instructions}</p>
                                                {step.cli && <pre className="text-xs bg-slate-950 p-3 rounded text-emerald-400 font-mono overflow-x-auto whitespace-pre-wrap">{step.cli}</pre>}
                                                {step.checkpoint && <div className="p-2 bg-sky-500/10 text-sky-700 dark:text-sky-300 text-xs rounded border border-sky-500/20">
                                                    <span className="font-bold">Point de contrôle : </span>{step.checkpoint}
                                                </div>}
                                            </div>
                                        );
                                    })}
                                </div>
                                {selLab.expectedResults && selLab.expectedResults.length > 0 && (
                                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg mt-4">
                                        <h4 className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-2">Vérifications attendues à la fin du labo</h4>
                                        <ul className="list-disc pl-5 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                                            {selLab.expectedResults.map((item, idx) => <li key={idx}>{item}</li>)}
                                        </ul>
                                    </div>
                                )}
                                {selLab.pitfalls && selLab.pitfalls.length > 0 && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg mt-4">
                                        <h4 className="text-xs font-bold uppercase text-red-600 dark:text-red-400 mb-2">Pièges fréquents</h4>
                                        <ul className="list-disc pl-5 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                                            {selLab.pitfalls.map((item, idx) => <li key={idx}>{item}</li>)}
                                        </ul>
                                    </div>
                                )}
                                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg mt-4">
                                    <h4 className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400 mb-2">Si ça ne marche pas (Diagnostic par couche OSI)</h4>
                                    <ul className="list-disc pl-5 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                                        {selLab.troubleshooting.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                }
                /* --- Vue bibliothèque --- */
                const levels = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];
                const parcoursF = ['Tous', 'TSSR', 'AIS', 'CCNA'];
                const byParcours = (p) => LABS_DATA.filter(l => l.parcours === p).length;
                return (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 border border-slate-200 dark:border-slate-700 space-y-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Bibliothèque de Labos Guidés</h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{LABS_DATA.length} labos — TSSR {byParcours('TSSR')} · AIS {byParcours('AIS')} · CCNA {byParcours('CCNA')} — {doneLabs} terminé(s). Progression sauvegardée dans le navigateur.</p>
                                </div>
                                <div className="w-full md:w-72">
                                    <input
                                        type="text"
                                        placeholder="🔍 Rechercher un labo (AD, GPO, VLAN, Zabbix...)"
                                        value={labSearch}
                                        onChange={(e) => setLabSearch(e.target.value)}
                                        className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-500"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex gap-2 flex-wrap items-center">
                                    <span className="text-[10px] font-bold uppercase text-slate-400">Parcours :</span>
                                    {parcoursF.map(p => (
                                        <button key={p} onClick={() => setLabParcours(p)} className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border ${labParcours === p ? 'bg-brand-600 text-white border-brand-600' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>{p === 'Tous' ? 'Tous' : p}</button>
                                    ))}
                                </div>
                                <div className="flex gap-2 flex-wrap items-center">
                                    <span className="text-[10px] font-bold uppercase text-slate-400">Niveau :</span>
                                    {levels.map(lv => (
                                        <button key={lv} onClick={() => setLabLevel(lv)} className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border ${labLevel === lv ? 'bg-brand-600 text-white border-brand-600' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>{lv}</button>
                                    ))}
                                </div>
                            </div>
                            {filteredLabs.length === 0 && (
                                <div className="text-center text-xs text-slate-500 py-8">Aucun labo ne correspond à votre recherche ou aux filtres sélectionnés.</div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {filteredLabs.map((l, idx) => {
                                    const stepsDone = new Set(labChecklist[l.id] || []).size;
                                    const pct = Math.round((stepsDone / l.steps.length) * 100);
                                    return (
                                        <div key={l.id || idx} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 flex flex-col">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${labParcoursBadge(l.parcours)}`}>{l.parcours}</span>
                                                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${labLevelBadge(l.level)}`}>{l.level}</span>
                                                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">⏱ {l.duration}</span>
                                                {labDone.has(l.id) && <span className="ml-auto text-[10px] font-bold text-emerald-500">✓ Terminé</span>}
                                            </div>
                                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{l.title}</h3>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 flex-1">{l.objective}</p>
                                            <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded overflow-hidden">
                                                <div className="h-1.5 bg-brand-500" style={{ width: `${pct}%` }}></div>
                                            </div>
                                            <button onClick={() => setSelectedLabId(l.id)} className="mt-1 px-3 py-1.5 bg-brand-600 w-full text-white text-xs font-bold rounded-lg hover:bg-brand-700">
                                                {stepsDone > 0 ? 'Continuer le labo' : 'Commencer le labo'} →
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            };
            // Rendu Onglet 1 : Vocabulaire Anglais (Recherche dédiée - Point A1)
            const renderVocabTab = () => {
                const vocabTypes = Array.from(new Set(ENGLISH_VOCAB.map(v => normVocabType(v.type).toString()))).sort();
                const filteredVocab = ENGLISH_VOCAB.filter(v => {
                    if (vocabCat !== 'Tous' && normVocabType(v.type) !== vocabCat) return false;
                    if (!vocabSearch) return true;
                    const q = normText(vocabSearch);
                    return [v.en, v.fr, v.def, v.exEn, v.exFr].some(t => normText(t).includes(q));
                });

                return (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Vocabulaire Anglais IT</h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{ENGLISH_VOCAB.length} termes — définition, traduction et exemple en contexte. Recherche insensible à la casse et aux accents.</p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-center w-full md:w-auto">
                                    <select
                                        value={vocabCat}
                                        onChange={(e) => setVocabCat(e.target.value)}
                                        aria-label="Filtrer le vocabulaire par catégorie"
                                        className="bg-slate-100 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700 px-2 py-1.5"
                                    >
                                        {['Tous', ...vocabTypes].map(opt => (
                                            <option key={opt} value={opt}>{opt === 'Tous' ? 'Toutes les catégories' : opt}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="🔍 Terme, traduction ou mot d'exemple..."
                                        value={vocabSearch}
                                        onChange={(e) => setVocabSearch(e.target.value)}
                                        className="w-full md:w-72 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-500"
                                    />
                                </div>
                            </div>

                            {vocabSearch && (
                                <div className="text-[11px] font-semibold text-brand-500">{filteredVocab.length} résultat(s) pour «&nbsp;{vocabSearch}&nbsp;» ({vocabCat === 'Tous' ? 'toutes catégories' : vocabCat})</div>
                            )}

                            {/* Tableau (desktop) — colonne Typologie supprimée */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold uppercase">
                                        <tr>
                                            <th className="p-2.5">Terme anglais</th>
                                            <th className="p-2.5">Français</th>
                                            <th className="p-2.5">Définition</th>
                                            <th className="p-2.5">Exemple</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                                        {filteredVocab.length > 0 ? (
                                            filteredVocab.map((v, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 align-top">
                                                    <td className="p-2.5 font-mono font-bold text-slate-900 dark:text-white">{v.en}</td>
                                                    <td className="p-2.5 whitespace-nowrap">{v.fr}</td>
                                                    <td className="p-2.5">{v.def || <span className="text-slate-400">—</span>}</td>
                                                    <td className="p-2.5 space-y-1">
                                                        {v.exEn && <span className="block italic">{v.exEn}</span>}
                                                        {v.exFr && <span className="block text-slate-500 dark:text-slate-400">{v.exFr}</span>}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center text-xs text-slate-500 py-6">Aucun terme correspondant trouvé dans le Vocabulaire Anglais.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Cartes (mobile) */}
                            <div className="md:hidden space-y-2">
                                {filteredVocab.length > 0 ? filteredVocab.map((v, idx) => (
                                    <div key={idx} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900/50 space-y-1">
                                        <div className="font-mono font-bold text-sm text-slate-900 dark:text-white">{v.en}</div>
                                        <div className="text-xs text-slate-600 dark:text-slate-300">{v.fr}</div>
                                        {v.def && <div className="text-xs text-slate-600 dark:text-slate-400">{v.def}</div>}
                                        {v.exEn && <div className="text-xs italic text-slate-500 dark:text-slate-400">{v.exEn}</div>}
                                        {v.exFr && <div className="text-xs text-slate-500 dark:text-slate-500">{v.exFr}</div>}
                                    </div>
                                )) : (
                                    <div className="text-center text-xs text-slate-500 py-6">Aucun terme correspondant trouvé.</div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            };

            // Rendu Onglet 2 : Commandes / Cheat Sheets — classement par fréquence d'usage
            const cmdSystem = (env) => {
                const e = String(env || '');
                if (/cisco/i.test(e)) return 'Cisco';
                if (/linux/i.test(e)) return 'Linux';
                if (/windows/i.test(e)) return 'Windows';
                return 'Autres';
            };
            const cmdSysLabel = { 'Cisco': 'A. Cisco IOS', 'Windows': 'B. Windows / PowerShell', 'Linux': 'C. Linux', 'Autres': 'D. Autres environnements (Docker…)' };
            const cmdRiskStyle = {
                "consultation": "bg-emerald-500/10 text-emerald-500",
                "modification": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                "destructif": "bg-red-500/10 text-red-500"
            };
            const renderCommandsTab = () => {
                const all = [];
                CHEAT_SHEETS.forEach(sheet => sheet.commands.forEach(c => all.push({ ...c, env: sheet.env, certif: sheet.certif, sheetTitle: sheet.title })));
                const visible = all.filter(c => {
                    if (cmdSys !== 'Tous' && cmdSystem(c.env) !== cmdSys) return false;
                    if (!cheatSheetSearch) return true;
                    const q = normText(cheatSheetSearch);
                    return [c.cmd, c.desc, c.ex, c.case, c.mode, c.env].some(t => normText(t).includes(q));
                });
                const countsAll = {};
                ['Cisco', 'Windows', 'Linux', 'Autres'].forEach(s => {
                    countsAll[s] = all.filter(c => cmdSystem(c.env) === s && (!cheatSheetSearch || [c.cmd, c.desc, c.ex, c.case, c.mode].some(t => normText(t).includes(cheatSheetSearch.toLowerCase())))).length;
                });
                const favCount = cmdFavorites.size;
                const groups = [
                    { f: 5, label: 'TOP COMMANDES INDISPENSABLES', stars: '★★★★★', sub: 'utilisation quotidienne' },
                    { f: 4, label: 'Utilisation fréquente', stars: '★★★★', sub: '' },
                    { f: 3, label: 'Utilisation régulière', stars: '★★★', sub: '' },
                    { f: 2, label: 'Utilisation occasionnelle', stars: '★★', sub: '' },
                    { f: 1, label: 'Utilisation avancée', stars: '★', sub: '' }
                ];
                const cmdCard = (c, idx) => {
                    const fid = c.cmd + '##' + c.sheetTitle;
                    const isFav = cmdFavorites.has(fid);
                    const isCopied = copiedCmd === fid;
                    return (
                        <div key={idx} className="text-xs bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 space-y-1.5 print-card">
                            <div className="flex items-start gap-2">
                                <code className={`bg-slate-900 px-2 py-1 rounded font-mono flex-1 min-w-0 ${c.risk === 'destructif' ? 'text-red-300' : c.risk === 'modification' ? 'text-amber-200' : 'text-emerald-400'} block overflow-x-auto whitespace-pre-wrap break-words`}>{c.cmd}</code>
                                <span className={`shrink-0 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${cmdRiskStyle[c.risk] || cmdRiskStyle['consultation']}`}>{c.risk || 'consultation'}</span>
                                <button onClick={() => toggleCmdFavorite(fid)} aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'} title={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                                    className={`shrink-0 px-1.5 py-0.5 rounded text-[11px] font-bold border ${isFav ? 'bg-yellow-400/20 text-yellow-500 border-yellow-400/40' : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-yellow-500'}`}>★</button>
                                <button onClick={() => copyCmd(c, fid)} aria-label="Copier la commande" title="Copier la commande"
                                    className="shrink-0 px-1.5 py-0.5 rounded text-[11px] font-bold border bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-brand-500">
                                    {isCopied ? '✓' : '⧉'}
                                </button>
                            </div>
                            <span className="text-slate-600 dark:text-slate-300 text-[11px] block">{c.desc}</span>
                            {c.case && <span className="text-slate-600 dark:text-slate-300 text-[11px] block"><span className="font-semibold text-brand-500">Cas d'utilisation : </span>{c.case}</span>}
                            {c.ex && <span className="text-slate-500 dark:text-slate-400 text-[11px] block">Exemple : <code className="font-mono whitespace-pre-wrap break-words">{c.ex}</code></span>}
                            <div className="flex flex-wrap gap-2 text-[10px]">
                                <span className="px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-500 font-semibold">{c.env}</span>
                                {c.certif && <span className="px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-500 font-mono">{c.certif}</span>}
                            </div>
                            {c.mode && <span className="text-[10px] block text-sky-600 dark:text-sky-400">⚠ Prérequis / précaution : {c.mode}</span>}
                        </div>
                    );
                };
                return (
                    <div id="printable-area" className="space-y-6">
                        <div className="flex justify-between items-center no-print border-b border-slate-200 dark:border-slate-700 pb-4">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Commandes — classées par fréquence d'usage</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {all.length} commandes — Cisco {countsAll.Cisco} · Windows/PS {countsAll.Windows} · Linux {countsAll.Linux} · Autres {countsAll.Autres} — favoris {favCount}.
                                </p>
                            </div>
                            <button onClick={() => window.print()} className="px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-lg hover:bg-brand-700">
                                🖨️ Imprimer (A4)
                            </button>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 no-print">
                            <div className="flex gap-2 flex-wrap">
                                {['Tous', 'Cisco', 'Windows', 'Linux', 'Autres'].map(s => (
                                    <button key={s} onClick={() => setCmdSys(s)}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${cmdSys === s ? 'bg-brand-600 text-white border-brand-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                                        {s === 'Tous' ? 'Tous les systèmes' : cmdSysLabel[s]}
                                    </button>
                                ))}
                            </div>
                            <div className="w-full md:w-72">
                                <input
                                    type="text"
                                    placeholder="🔍 Commande, usage (DNS, routes, permissions...) ou cas d'usage"
                                    value={cheatSheetSearch}
                                    onChange={(e) => setCheatSheetSearch(e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-500"
                                />
                            </div>
                        </div>
                        {visible.length === 0 && (
                            <div className="text-center text-xs text-slate-500 py-6">Aucune commande ne correspond à votre recherche / filtre.</div>
                        )}
                        {groups.map(g => {
                            const items = visible.filter(c => (c.freq || 3) === g.f);
                            if (items.length === 0) return null;
                            return (
                                <div key={g.f} className="space-y-3">
                                    <h3 className="text-sm font-bold text-brand-600 dark:text-brand-400 border-b border-slate-200 dark:border-slate-700 pb-1">
                                        {g.f === 5 ? `${g.label} — ${g.stars}` : `${g.stars} ${g.label}`}
                                        <span className="text-slate-400 font-normal"> ({items.length} commandes{g.sub ? `, ${g.sub}` : ''})</span>
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                        {items.map((c, idx) => cmdCard(c, idx))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            };
            // Rendu Onglet 3 : Glossaire (Recherche dédiée - Point A3)
            const glossCertifOptions = useMemo(() => {
                const set = new Set();
                GLOSSARY_DATA.forEach(g => String(g.certif || 'Tous').split('/').forEach(c => set.add(c.trim())));
                set.delete('Tous');
                return ['Tous', ...Array.from(set)];
            }, []);
            const renderGlossaryTab = () => {
                const filteredGlossary = GLOSSARY_DATA.filter(g => {
                    if (glossCertif !== 'Tous' && !(String(g.certif || '').split('/').map(c => c.trim()).includes(glossCertif))) return false;
                    if (!glossarySearch) return true;
                    const q = normText(glossarySearch);
                    return [g.term, g.en, g.def, g.cat, g.util].some(t => normText(t).includes(q));
                });
                const glossCats = Array.from(new Set(GLOSSARY_DATA.map(g => g.cat).filter(Boolean)));

                return (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Glossaire Bilingue IT</h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{GLOSSARY_DATA.length} definitions bilingues, recherche insensible a la casse et aux accents.</p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-center w-full md:w-auto">
                                    <select
                                        value={glossCertif}
                                        onChange={(e) => setGlossCertif(e.target.value)}
                                        aria-label="Filtrer le glossaire par certification"
                                        className="bg-slate-100 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700 px-2 py-1.5"
                                    >
                                        {glossCertifOptions.map(opt => (
                                            <option key={opt} value={opt}>{opt === 'Tous' ? 'Toutes les certifications' : opt}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="🔍 Rechercher un sigle, terme..."
                                        value={glossarySearch}
                                        onChange={(e) => setGlossarySearch(e.target.value)}
                                        className="w-full md:w-72 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {glossarySearch && (
                                    <div className="col-span-2 text-[11px] font-semibold text-brand-500">
                                        {filteredGlossary.length} resultat(s) pour «&nbsp;{glossarySearch}&nbsp;»
                                    </div>
                                )}
                                {filteredGlossary.length > 0 ? (
                                    filteredGlossary.map((g, idx) => (
                                        <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                                            <div className="flex justify-between items-center mb-1">
                                                <strong className="text-sm font-bold text-slate-900 dark:text-white">{g.term}</strong>
                                                <span className="text-[10px] font-mono bg-sky-500/10 text-sky-500 px-2 py-0.5 rounded">{g.certif}</span>
                                            </div>
                                            <span className="text-brand-500 font-semibold block mb-1">{g.en}</span>
                                            {g.cat && (
                                                <span className="inline-block text-[10px] font-semibold bg-brand-500/10 text-brand-500 px-2 py-0.5 rounded mb-1">{g.cat}</span>
                                            )}
                                            <p className="text-slate-600 dark:text-slate-400">{g.def}</p>
                                            {g.util && <p className="text-[11px] mt-1 text-slate-500 dark:text-slate-400 border-l-2 border-brand-500/40 pl-2">{g.util}</p>}
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-2 text-center text-xs text-slate-500 py-6">Aucun terme correspondant trouve dans le glossaire.</div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            };

            // Rendu Onglet Scripts (bibliothèque opérationnelle : Windows PowerShell/Batch + Linux Bash)
            const renderScriptsTab = () => {
                const scripts = SCRIPTS_LIB.filter(s => {
                    if (!scriptsSearch) return true;
                    const q = normText(scriptsSearch);
                    return normText([s.titre, s.description, s.usage, s.type, s.code, s.sortie].join(' ')).includes(q);
                });
                const winScripts = scripts.filter(s => s.os === 'Windows');
                const linScripts = scripts.filter(s => s.os === 'Linux');
                const scriptCard = (s) => (
                    <div key={s.titre} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                        <div className="flex flex-wrap justify-between items-start gap-2">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{s.titre}</h4>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400">{s.type}</span>
                                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">{s.niveau}</span>
                            </div>
                        </div>
                        <div className="p-2.5 bg-sky-500/10 border-l-4 border-sky-500/50 rounded text-xs text-slate-700 dark:text-slate-300">
                            <span className="font-bold uppercase text-[10px] text-sky-600 dark:text-sky-400 block mb-0.5">📝 Description</span>{s.description}
                        </div>
                        <div className="p-2.5 bg-purple-500/10 border-l-4 border-purple-500/50 rounded text-xs text-slate-700 dark:text-slate-300">
                            <span className="font-bold uppercase text-[10px] text-purple-600 dark:text-purple-400 block mb-0.5">🎯 Cas d'utilisation</span>{s.usage}
                        </div>
                        <div className="rounded-lg overflow-hidden border border-slate-700">
                            <div className="bg-slate-800 px-3 py-1 text-[10px] font-bold uppercase text-slate-300">Script commenté</div>
                            <pre className="bg-slate-950 p-3 text-[11px] text-emerald-400 font-mono whitespace-pre-wrap break-words leading-relaxed">{s.code}</pre>
                        </div>
                        <div>
                            <span className="text-[10px] font-bold uppercase text-brand-500 block mb-1">🖥️ Exemple de sortie</span>
                            <pre className="bg-slate-100 dark:bg-slate-900/70 p-2.5 text-[10px] text-slate-600 dark:text-slate-400 font-mono whitespace-pre-wrap break-words rounded border border-slate-200 dark:border-slate-700">{s.sortie}</pre>
                        </div>
                    </div>
                );
                return (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 border border-slate-200 dark:border-slate-700 space-y-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">💻 Bibliothèque de scripts opérationnels</h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{SCRIPTS_LIB.length} scripts du quotidien ({winScripts.length} Windows · {linScripts.length} Linux), classés du plus fréquent au moins fréquent : description, cas d'usage, script commenté, sortie réelle et niveau.</p>
                                </div>
                                <div className="w-full md:w-72">
                                    <input type="text" placeholder="🔍 Rechercher un script..." value={scriptsSearch} onChange={(e) => setScriptsSearch(e.target.value)}
                                        className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-500" />
                                </div>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {['Windows', 'Linux'].map(os => (
                                    <button key={os} onClick={() => setScriptsOs(os)} className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${scriptsOs === os ? 'bg-brand-600 text-white border-brand-600' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>{os === 'Windows' ? '🪟 Scripts Windows (PowerShell · Batch)' : '🐧 Scripts Linux (Bash)'}</button>
                                ))}
                            </div>
                            {(scriptsOs === 'Windows' ? winScripts : linScripts).map((s, i) => (
                                <div key={s.titre} className="flex gap-2">
                                    <div className="w-6 text-[10px] font-black text-slate-300 dark:text-slate-600 pt-5 text-right">{i + 1}</div>
                                    <div className="flex-1">{scriptCard(s)}</div>
                                </div>
                            ))}
                            {(scriptsOs === 'Windows' ? winScripts : linScripts).length === 0 && (
                                <div className="text-center text-xs text-slate-500 py-8">Aucun script ne correspond à votre recherche.</div>
                            )}
                        </div>
                    </div>
                );
            };

            // Rendu Onglet Dépannage (centre de dépannage — liste déroulante + fiches complètes)
            const renderDepannageTab = () => {
                const filtered = DEPANNAGE_DATA.filter(d => {
                    if (labParcours !== 'Tous' && d.parcours !== labParcours) return false;
                    if (!labSearch) return true;
                    const q = normText(labSearch);
                    return normText([d.titre, d.symptome, d.contexte, d.cat, ...(d.causes || []), ...(d.diagnostic || []), ...(d.resolution || []), ...(d.commandes || []), d.casEntreprise || ''].join(' ')).includes(q);
                }).sort((a, b) => (b.freq || 3) - (a.freq || 3));
                const depFreqGroups = [
                    { f: 5, label: 'Très fréquent — à connaître par cœur' },
                    { f: 4, label: 'Fréquent — incidents courants en production' },
                    { f: 3, label: 'Régulier — incidents ponctuels' },
                    { f: 2, label: 'Occasionnel' },
                    { f: 1, label: 'Rare — cas avancés' }
                ];
                const depCats = Array.from(new Set(DEPANNAGE_DATA.map(d => d.cat || 'Autres')));
                const selDep = DEPANNAGE_DATA.find(d => d.id === selectedDepId);
                const byParcours = (p) => DEPANNAGE_DATA.filter(d => d.parcours === p).length;
                const parcoursBadge = (p) => ({
                    "TSSR": "bg-sky-500/10 text-sky-500",
                    "AIS": "bg-purple-500/10 text-purple-500",
                    "CCNA": "bg-brand-500/10 text-brand-500"
                }[p] || "bg-slate-500/10 text-slate-400");
                const freqLabel = (f) => ({ 5: 'Très fréquent', 4: 'Fréquent', 3: 'Régulier', 2: 'Occasionnel', 1: 'Rare' }[f] || 'Régulier');
                return (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 border border-slate-200 dark:border-slate-700 space-y-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Centre de dépannage</h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{DEPANNAGE_DATA.length} problèmes réels du technicien — du plus fréquent au plus rare. Choisir un problème pour afficher la fiche complète. TSSR {byParcours('TSSR')} · AIS {byParcours('AIS')} · CCNA {byParcours('CCNA')}</p>
                                </div>
                                <div className="w-full md:w-72">
                                    <input
                                        type="text"
                                        placeholder="🔍 Symptôme, service, cause, commande..."
                                        value={labSearch}
                                        onChange={(e) => setLabSearch(e.target.value)}
                                        className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-500"
                                    />
                                </div>
                            </div>
                            {/* Liste déroulante : choisir un problème */}
                            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-end">
                                <div className="flex-1">
                                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">Choisir un problème :</label>
                                    <select
                                        value={selectedDepId}
                                        onChange={(e) => { setSelectedDepId(e.target.value); window.scrollTo({ top: 0 }); }}
                                        className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-500"
                                    >
                                        <option value="">— Sélectionner un problème dans la liste ({DEPANNAGE_DATA.length} fiches) —</option>
                                        {depCats.map(cat => (
                                            <optgroup key={cat} label={cat}>
                                                {DEPANNAGE_DATA.filter(d => (d.cat || 'Autres') === cat).map(d => (
                                                    <option key={d.id} value={d.id}>{d.titre}</option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                </div>
                                {selDep && (
                                    <button onClick={() => setSelectedDepId('')} className="px-3 py-2 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 whitespace-nowrap">✕ Fermer la fiche</button>
                                )}
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {['Tous', 'TSSR', 'AIS', 'CCNA'].map(p => (
                                    <button key={p} onClick={() => setLabParcours(p)} className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border ${labParcours === p ? 'bg-brand-600 text-white border-brand-600' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>{p === 'Tous' ? 'Tous' : p}</button>
                                ))}
                            </div>

                            {/* Fiche complète du problème sélectionné */}
                            {selDep && (
                                <div className="p-4 md:p-5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-brand-500/30 space-y-4">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${parcoursBadge(selDep.parcours)}`}>{selDep.parcours}</span>
                                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">{selDep.cat}</span>
                                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">Fréquence : {freqLabel(selDep.freq)}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selDep.titre}</h3>
                                    <div className="p-3 bg-red-500/10 border-l-4 border-red-500/50 rounded text-xs text-slate-700 dark:text-slate-300">
                                        <span className="font-bold uppercase text-[10px] text-red-600 dark:text-red-400 block mb-0.5">Symptôme</span>{selDep.symptome}
                                    </div>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed"><span className="font-bold text-slate-700 dark:text-slate-200">Contexte : </span>{selDep.contexte}</p>
                                    {selDep.verifications && selDep.verifications.length > 0 && (
                                        <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded">
                                            <span className="text-[10px] font-bold uppercase text-sky-600 dark:text-sky-400 block mb-1">⚡ Vérifications rapides (avant d'aller plus loin)</span>
                                            <ul className="list-disc pl-5 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                                                {selDep.verifications.map((s, si) => <li key={si}>{s}</li>)}
                                            </ul>
                                        </div>
                                    )}
                                    {selDep.outils && (
                                        <p className="text-xs text-slate-600 dark:text-slate-400"><span className="font-bold text-purple-600 dark:text-purple-400">🧰 Outils utiles : </span>{selDep.outils}</p>
                                    )}
                                    {selDep.commandes && selDep.commandes.length > 0 && (
                                        <div className="rounded-lg overflow-hidden border border-slate-700">
                                            <div className="bg-slate-800 px-3 py-1 text-[10px] font-bold uppercase text-slate-300">Commandes clés</div>
                                            <pre className="bg-slate-950 p-3 text-[11px] text-emerald-400 font-mono whitespace-pre-wrap break-words leading-relaxed">{selDep.commandes.join('\n')}</pre>
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-[10px] font-bold uppercase text-sky-600 dark:text-sky-400 block mb-1">Diagnostic détaillé (dans l'ordre)</span>
                                        <ol className="list-decimal pl-5 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                                            {(selDep.diagnostic || []).map((s, si) => <li key={si}>{s}</li>)}
                                        </ol>
                                    </div>
                                    {selDep.causes && selDep.causes.length > 0 && (
                                        <div className="p-3 bg-amber-500/10 border-l-4 border-amber-500/50 rounded text-xs text-slate-700 dark:text-slate-300">
                                            <span className="font-bold uppercase text-[10px] text-amber-600 dark:text-amber-400 block mb-0.5">Causes fréquentes</span>
                                            <ul className="list-disc pl-5 space-y-0.5">
                                                {selDep.causes.map((s, si) => <li key={si}>{s}</li>)}
                                            </ul>
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 block mb-1">Résolution</span>
                                        <ul className="list-disc pl-5 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                                            {(selDep.resolution || []).map((s, si) => <li key={si}>{s}</li>)}
                                        </ul>
                                    </div>
                                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded text-xs text-slate-700 dark:text-slate-200">
                                        <span className="font-bold uppercase text-[10px] text-emerald-600 dark:text-emerald-400 block mb-0.5">🛡️ Prévention</span>{selDep.prevention}
                                    </div>
                                    {selDep.casEntreprise && (
                                        <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded text-xs text-slate-700 dark:text-slate-300">
                                            <span className="font-bold uppercase text-[10px] text-purple-600 dark:text-purple-400 block mb-0.5">🏢 Cas d'entreprise</span>{selDep.casEntreprise}
                                        </div>
                                    )}
                                </div>
                            )}

                            {filtered.length === 0 && (
                                <div className="text-center text-xs text-slate-500 py-8">Aucune fiche ne correspond à votre recherche.</div>
                            )}
                    {!selDep && depFreqGroups.map(g => {
                                const items = filtered.filter(d => (d.freq || 3) === g.f);
                                if (items.length === 0) return null;
                                return (
                                    <div key={g.f} className="space-y-3">
                                        <h3 className="text-sm font-bold text-brand-600 dark:text-brand-400 border-b border-slate-200 dark:border-slate-700 pb-1">
                                            {g.label} <span className="text-slate-400 font-normal">({items.length})</span>
                                        </h3>
                                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                            {items.map((d, idx) => (
                                                <button key={idx} onClick={() => { setSelectedDepId(d.id); window.scrollTo({ top: 0 }); }}
                                                    className="text-left p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 hover:border-brand-500/50 hover:shadow-sm transition-all">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${parcoursBadge(d.parcours)}`}>{d.parcours}</span>
                                                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">{d.cat}</span>
                                                    </div>
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{d.titre}</h4>
                                                    <p className="text-xs text-slate-600 dark:text-slate-400">{d.symptome}</p>
                                                    <span className="text-[10px] font-bold text-brand-500 block">Cliquer pour ouvrir la fiche complète →</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            };

            // Rendu Onglet Préparation Examen CCNA (fiches + entraînement + simulateur + subnetting)
            // Rendu Onglet Les Indispensables (référence quotidienne)
            const renderEssentielsTab = () => {
                const essTabs = [
                    { id: 'ports', label: 'Ports réseau' },
                    { id: 'simulateurs', label: 'Simulateurs' },
                    { id: 'commandes', label: 'Commandes essentielles' },
                    { id: 'adresses', label: 'Adresses privées' },
                    { id: 'cidr', label: 'Masques CIDR' },
                    { id: 'http', label: 'Codes HTTP' },
                    { id: 'outils', label: 'Outils' }
                ];
                const filteredPorts = PORTS_DATA.filter(p => {
                    if (essPortProto !== 'Tous' && p.proto !== essPortProto && p.proto !== 'TCP/UDP' && (essPortProto === 'TCP' ? !p.proto.includes('TCP') : !p.proto.includes('UDP'))) return false;
                    if (!essPortSearch) return true;
                    const q = normText(essPortSearch);
                    return normText([p.port, p.service, p.proto, p.desc].join(' ')).includes(q);
                });
                const toggleFav = (port) => {
                    const next = essPortFavs.includes(port) ? essPortFavs.filter(x => x !== port) : [...essPortFavs, port];
                    setEssPortFavs(next); localStorage.setItem('ess_port_favs', JSON.stringify(next));
                };
                const portQuizNext = () => {
                    const pool = PORTS_DATA.filter(p => p.port);
                    const q = pool[Math.floor(Math.random() * pool.length)];
                    const others = pool.filter(p => p !== q).sort(() => Math.random() - 0.5).slice(0, 3);
                    setPortQuiz({ q, opts: [...others, q].sort(() => Math.random() - 0.5), done: false, chosen: null, streak: portQuiz.done && portQuiz.chosen === portQuiz.opts.indexOf(portQuiz.q) ? portQuiz.streak + 1 : 0 });
                };
                // Table CIDR calculée
                const cidrRows = [];
                for (let p = 8; p <= 32; p++) {
                    const bits = '1'.repeat(p) + '0'.repeat(32 - p);
                    const mask = [0, 8, 16, 24].map(s => parseInt(bits.slice(s, s + 8) || '0', 2)).join('.');
                    const size = 2 ** (32 - p);
                    const usable = p >= 31 ? (p === 31 ? 2 : 1) : size - 2;
                    const wc = [0, 8, 16, 24].map(s => parseInt('0'.repeat(p) + '1'.repeat(32 - p) === '' ? '0' : (bits === '' ? '' : ''.padEnd(0)) || '', 2)).join('.');
                    const wildcard = [0, 8, 16, 24].map(s => {
                        const seg = bits.slice(s, s + 8).split('').map(b => (b === '1' ? '0' : '1')).join('');
                        return seg === '' ? '0' : parseInt(seg, 2);
                    }).join('.');
                    cidrRows.push({ p, mask, size, usable, wildcard });
                }
                const essCats = ['Toutes', ...Array.from(new Set(ESSENTIALS_COMMANDS.filter(x => x.os === essOs).map(x => x.cat)))];
                return (
                    <div className="space-y-5">
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 border border-slate-200 dark:border-slate-700 space-y-4">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">🛠️ Les Indispensables</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">La référence quotidienne du technicien support, de l'admin systèmes et de l'admin réseau : ports, commandes, adresses, masques, codes HTTP et outils. Orienté terrain.</p>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {essTabs.map(t => (
                                    <button key={t.id} onClick={() => setEssTab(t.id)} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${essTab === t.id ? 'bg-brand-600 text-white border-brand-600' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>
                                        <svg className="w-3.5 h-3.5 text-sky-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            {t.id === 'ports' && <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />}
                                            {t.id === 'simulateurs' && <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />}
                                            {t.id === 'commandes' && <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                                            {t.id === 'adresses' && <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />}
                                            {t.id === 'cidr' && <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />}
                                            {t.id === 'http' && <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />}
                                            {t.id === 'outils' && <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />}
                                            {t.id === 'outils' && <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
                                        </svg>
                                        {t.label}
                                    </button>
                                ))}
                            </div>

                            {/* ===== PORTS ===== */}
                            {essTab === 'ports' && (
                                <div className="space-y-4">
                                    <div className="flex flex-col md:flex-row gap-3">
                                        <input type="text" placeholder="🔍 Rechercher un port, un service..." value={essPortSearch} onChange={(e) => setEssPortSearch(e.target.value)}
                                            className="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-500" />
                                        <div className="flex gap-2">
                                            {['Tous', 'TCP', 'UDP'].map(pr => (
                                                <button key={pr} onClick={() => setEssPortProto(pr)} className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border ${essPortProto === pr ? 'bg-brand-600 text-white border-brand-600' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>{pr}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                                        <table className="w-full text-xs">
                                            <thead className="bg-slate-100 dark:bg-slate-900/70">
                                                <tr>
                                                    <th className="p-2 text-left font-bold text-slate-600 dark:text-slate-300">Port</th>
                                                    <th className="p-2 text-left font-bold text-slate-600 dark:text-slate-300">Service</th>
                                                    <th className="p-2 text-left font-bold text-slate-600 dark:text-slate-300">TCP/UDP</th>
                                                    <th className="p-2 text-left font-bold text-slate-600 dark:text-slate-300">Description</th>
                                                    <th className="p-2 text-center font-bold text-slate-600 dark:text-slate-300">★</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredPorts.map((p, i) => (
                                                    <tr key={i} className={`border-t border-slate-100 dark:border-slate-800 ${essPortFavs.includes(p.port) ? 'bg-amber-500/5' : i % 2 ? 'bg-slate-50/50 dark:bg-slate-900/20' : ''}`}>
                                                        <td className="p-2 font-mono font-bold text-brand-600 dark:text-brand-400">{p.port}</td>
                                                        <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{p.service}</td>
                                                        <td className="p-2 text-slate-600 dark:text-slate-400">{p.proto}</td>
                                                        <td className="p-2 text-slate-600 dark:text-slate-400">{p.desc}</td>
                                                        <td className="p-2 text-center">
                                                            <button onClick={() => toggleFav(p.port)} className={`text-sm ${essPortFavs.includes(p.port) ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600 hover:text-amber-400'}`}>★</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Quiz des ports */}
                                    <div className="p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl space-y-3">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">🎯 Quiz des ports</h4>
                                            <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400">Série : {portQuiz.streak}</span>
                                        </div>
                                        {!portQuiz.done ? (
                                            <div className="space-y-2">
                                                <p className="text-xs font-bold text-slate-900 dark:text-white">Quel service écoute sur le port {portQuiz.q.port} ({portQuiz.q.proto}) ?</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {portQuiz.opts.map((o, i) => (
                                                        <button key={i} onClick={() => setPortQuiz(pz => ({ ...pz, done: true, chosen: i }))} className="p-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:border-brand-500 text-slate-700 dark:text-slate-300 text-left">{o.service}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <p className={`text-xs font-bold ${portQuiz.chosen !== null && portQuiz.opts[portQuiz.chosen] === portQuiz.q ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                                                    {portQuiz.chosen !== null && portQuiz.opts[portQuiz.chosen] === portQuiz.q ? `✔ Exact ! ${portQuiz.q.port} = ${portQuiz.q.service}` : `✕ Port ${portQuiz.q.port} = ${portQuiz.q.service} (${portQuiz.q.proto}) — vous aviez choisi ${portQuiz.opts[portQuiz.chosen] !== undefined ? portQuiz.opts[portQuiz.chosen].service : '—'}.`}
                                                </p>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400">{portQuiz.q.desc}</p>
                                                <button onClick={portQuizNext} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-brand-600 text-white">Question suivante →</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* ===== COMMANDES ===== */}
                            {essTab === 'commandes' && (
                                <div className="space-y-4">
                                    <div className="flex gap-2 flex-wrap">
                                        {['Windows', 'Linux', 'Cisco'].map(os => (
                                            <button key={os} onClick={() => { setEssOs(os); setEssCat('Toutes'); }} className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${essOs === os ? 'bg-brand-600 text-white border-brand-600' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>{os}</button>
                                        ))}
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        {essCats.map(cat => (
                                            <button key={cat} onClick={() => setEssCat(cat)} className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border ${essCat === cat ? 'bg-amber-500 text-white border-amber-500' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>{cat}</button>
                                        ))}
                                    </div>
                                    {ESSENTIALS_COMMANDS.filter(x => x.os === essOs && (essCat === 'Toutes' || x.cat === essCat)).map((grp, gi) => (
                                        <div key={gi} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                                            <h4 className="text-xs font-bold text-brand-600 dark:text-brand-400 mb-2">{grp.os} · {grp.cat}</h4>
                                            <div className="space-y-1.5">
                                                {grp.items.map((it, ii) => (
                                                    <div key={ii} className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                                                        <code className="bg-slate-950 text-emerald-400 px-2 py-0.5 rounded text-[11px] font-mono whitespace-nowrap overflow-x-auto max-w-full md:max-w-[45%]">{it.c}</code>
                                                        <span className="text-[11px] text-slate-600 dark:text-slate-400">{it.d}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ===== ADRESSES PRIVÉES ===== */}
                            {essTab === 'adresses' && (
                                <div className="space-y-4">
                                    <p className="text-xs text-slate-500">Les trois plages privées RFC 1918 : non routables sur Internet, traduites par NAT à la sortie.</p>
                                    {PRIVATE_RANGES.map((r, i) => (
                                        <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                                            <div className="flex flex-wrap items-baseline gap-3">
                                                <span className="text-sm font-black font-mono text-brand-600 dark:text-brand-400">{r.cidr}</span>
                                                <span className="text-[11px] font-mono text-slate-500">{r.plages}</span>
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600">{r.adr.toLocaleString('fr-FR')} adresses</span>
                                            </div>
                                            <p className="text-xs text-slate-700 dark:text-slate-300">{r.usage}</p>
                                        </div>
                                    ))}
                                    <div className="p-3 bg-red-500/10 border-l-4 border-red-500/50 rounded text-xs text-slate-700 dark:text-slate-300">
                                        <span className="font-bold uppercase text-[10px] text-red-600 dark:text-red-400 block mb-0.5">⚠️ Piège d'examen</span>
                                        172.16.0.0/12 ne couvre QUE 172.16.x.x à 172.31.x.x. Une adresse 172.32.1.1 ou 172.1.1.1 est PUBLIQUE.
                                    </div>
                                </div>
                            )}

                            {/* ===== CIDR ===== */}
                            {essTab === 'cidr' && (
                                <div className="space-y-3">
                                    <p className="text-xs text-slate-500">Table complète /8 → /32 : masque, taille, hôtes utilisables et wildcard (nécessaire pour les ACL).</p>
                                    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                                        <table className="w-full text-xs">
                                            <thead className="bg-slate-100 dark:bg-slate-900/70">
                                                <tr>
                                                    <th className="p-2 text-left font-bold text-slate-600 dark:text-slate-300">CIDR</th>
                                                    <th className="p-2 text-left font-bold text-slate-600 dark:text-slate-300">Masque</th>
                                                    <th className="p-2 text-left font-bold text-slate-600 dark:text-slate-300">Adresses</th>
                                                    <th className="p-2 text-left font-bold text-slate-600 dark:text-slate-300">Hôtes utilisables</th>
                                                    <th className="p-2 text-left font-bold text-slate-600 dark:text-slate-300">Wildcard (ACL)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cidrRows.map((r, i) => (
                                                    <tr key={r.p} className={`border-t border-slate-100 dark:border-slate-800 ${[24, 25, 26, 27, 28, 29, 30].includes(r.p) ? 'bg-brand-500/5' : i % 2 ? 'bg-slate-50/50 dark:bg-slate-900/20' : ''}`}>
                                                        <td className="p-2 font-mono font-bold text-brand-600 dark:text-brand-400">/{r.p}</td>
                                                        <td className="p-2 font-mono text-slate-700 dark:text-slate-300">{r.mask}</td>
                                                        <td className="p-2 text-slate-600 dark:text-slate-400">{r.size.toLocaleString('fr-FR')}</td>
                                                        <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{r.usable.toLocaleString('fr-FR')}</td>
                                                        <td className="p-2 font-mono text-slate-600 dark:text-slate-400">{r.wildcard}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-[11px] text-slate-500">Lignes surlignées : les /24 à /30, les plus utilisés en entreprise. Rappel : wildcard = masque inversé (255.255.255.192 → 0.0.0.63) ; host = 0.0.0.0 ; any = 255.255.255.255.</p>
                                    <div className="mt-3">
                                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Équivalence hexadécimal ↔ binaire (1 chiffre hex = 4 bits)</p>
                                        <div className="grid grid-cols-4 md:grid-cols-8 gap-1.5 text-[11px]">
                                            {Array.from({ length: 16 }, (_, i) => (
                                                <div key={i} className="p-1.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-center">
                                                    <span className="font-mono font-bold text-brand-600 dark:text-brand-400">{i.toString(16).toUpperCase()}</span>
                                                    <span className="text-slate-400 mx-1">=</span>
                                                    <span className="font-mono text-slate-700 dark:text-slate-300">{i.toString(2).padStart(4, '0')}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-[10px] text-slate-500 mt-2">Exemple : 0xA3 = 1010 0011 ; 0xFF = 1111 1111 (8 bits à 1 = masque /8 sur un octet).</p>
                                    </div>
                                </div>
                            )}

                            {/* ===== HTTP ===== */}
                            {essTab === 'http' && (
                                <div className="space-y-3">
                                    <p className="text-xs text-slate-500">Ce que le navigateur (ou curl) vous dit vraiment. 1xx information, 2xx succès, 3xx redirection, 4xx faute du client, 5xx faute du serveur.</p>
                                    {HTTP_CODES.map(c => (
                                        <div key={c.code} className="flex items-start gap-3 p-2.5 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                            <span className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${c.code.startsWith('2') ? 'bg-emerald-500/10 text-emerald-600' : c.code.startsWith('3') ? 'bg-sky-500/10 text-sky-600' : c.code.startsWith('4') ? 'bg-amber-500/10 text-amber-600' : c.code.startsWith('5') ? 'bg-red-500/10 text-red-500' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>{c.code}</span>
                                            <div>
                                                <span className="text-xs font-bold text-slate-900 dark:text-white">{c.nom} — </span>
                                                <span className="text-xs text-slate-600 dark:text-slate-400">{c.d}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ===== OUTILS ===== */}
                            {essTab === 'outils' && (
                                <div className="space-y-3">
                                    <p className="text-xs text-slate-500">La trousse du technicien : chaque outil avec son rôle, un cas d'usage terrain et un exemple concret.</p>
                                    {TOOLS_DATA.map((t, i) => (
                                        <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.nom}</h4>
                                            <p className="text-xs text-slate-700 dark:text-slate-300"><span className="font-bold text-brand-500">Rôle : </span>{t.role}</p>
                                            <p className="text-xs text-slate-700 dark:text-slate-300"><span className="font-bold text-purple-500">Cas d'usage : </span>{t.usage}</p>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 rounded p-2"><span className="font-bold">Exemple : </span>{t.ex}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {/* ===== SIMULATEURS ===== */}
                            {essTab === 'simulateurs' && (() => {
                                // --- Simulateur CIDR ---
                                const parseCidr = (ip, pfx) => {
                                    const parts = ip.split('.').map(Number);
                                    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return null;
                                    const bits = '1'.repeat(pfx) + '0'.repeat(32 - pfx);
                                    const mask = [0, 8, 16, 24].map(s => parseInt(bits.slice(s, s + 8) || '0', 2)).join('.');
                                    const wildcard = [0, 8, 16, 24].map(s => parseInt(bits.slice(s, s + 8).split('').map(b => (b === '1' ? '0' : '1')).join(''), 2)).join('.');
                                    const ipInt = ((parts[0] << 24) >>> 0) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
                                    const size = Math.pow(2, 32 - pfx);
                                    const netInt = Math.floor(ipInt / size) * size;
                                    const toIp = (n) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
                                    const network = toIp(netInt);
                                    const broadcast = toIp(netInt + size - 1);
                                    const usable = pfx >= 31 ? (pfx === 31 ? 2 : 1) : size - 2;
                                    return { mask, wildcard, network, broadcast, usable, size, first: toIp(netInt + (pfx >= 31 ? 0 : 1)), last: toIp(netInt + size - (pfx >= 31 ? 1 : 2)), cls: parts[0] < 128 ? 'A' : parts[0] < 192 ? 'B' : parts[0] < 224 ? 'C' : parts[0] < 240 ? 'D (multicast)' : 'E (expérimentale)', priv: (parts[0] === 10 || (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) || (parts[0] === 192 && parts[1] === 168)) ? 'privée (RFC 1918)' : 'publique (ou spéciale)' };
                                };
                                // --- Simulateur IPv6 ---
                                const v6analyze = (addr) => {
                                    const raw = addr.trim();
                                    if (!raw || !raw.includes(':')) return null;
                                    const halves = raw.split('::');
                                    if (halves.length > 2) return { error: "Le :: ne peut apparaître qu'une fois" };
                                    let groups;
                                    if (halves.length === 2) {
                                        const a = halves[0] ? halves[0].split(':') : [];
                                        const b = halves[1] ? halves[1].split(':') : [];
                                        const missing = 8 - a.length - b.length;
                                        if (missing < 1) return { error: 'Trop de groupes pour un ::' };
                                        groups = [...a, ...Array(missing).fill('0'), ...b];
                                    } else {
                                        groups = raw.split(':');
                                    }
                                    if (groups.length !== 8) return { error: groups.length + ' groupes au lieu de 8' };
                                    if (groups.some(g => g && !/^[0-9a-fA-F]{1,4}$/.test(g))) return { error: 'Groupe hexadécimal invalide' };
                                    const full = groups.map(g => g.toUpperCase().padStart(4, '0')).join(':');
                                    let best = -1, bestLen = 0, cur0 = -1, curLen = 0;
                                    groups.forEach((g, i) => {
                                        if (g === '' || parseInt(g, 16) === 0) { if (cur0 === -1) cur0 = i; curLen++; } else { if (curLen > bestLen) { best = cur0; bestLen = curLen; } cur0 = -1; curLen = 0; }
                                    });
                                    if (curLen > bestLen) { best = cur0; bestLen = curLen; }
                                    const short = (g) => g.replace(/^0+(?=.)/, '').toLowerCase();
                                    let abbr;
                                    if (bestLen >= 2) {
                                        abbr = groups.slice(0, best).map(short).join(':') + '::' + groups.slice(best + bestLen).map(short).join(':');
                                    } else {
                                        abbr = groups.map(short).join(':');
                                    }
                                    let type = 'réservée / spéciale';
                                    const firstWord = parseInt(groups[0].padStart(4, '0'), 16);
                                    if (raw.toLowerCase().startsWith('ff')) type = 'multicast ff00::/8';
                                    else if (firstWord >= 0xfe80 && firstWord <= 0xfebf) type = 'link-local fe80::/10';
                                    else if (firstWord >= 0xfc00 && firstWord <= 0xfdff) type = 'ULA fd00::/8';
                                    else if (firstWord >= 0x2000 && firstWord <= 0x3fff) type = 'globale (2000::/3)';
                                    return { full, abbr, type };
                                };
                                const cidrRes = parseCidr(subCidr.ip.trim(), subCidr.pfx);
                                const v6Res = subV6.addr.trim() ? v6analyze(subV6.addr) : null;
                                const eui64 = (() => {
                                    const m = subV6.mac.trim().match(/^([0-9a-fA-F]{2})[-:]([0-9a-fA-F]{2})[-:]([0-9a-fA-F]{2})[-:]([0-9a-fA-F]{2})[-:]([0-9a-fA-F]{2})[-:]([0-9a-fA-F]{2})$/);
                                    if (!m) return null;
                                    const bytes = m.slice(1).map(b => parseInt(b, 16));
                                    bytes[0] ^= 0x02;
                                    const hex = bytes.map(b => b.toString(16).padStart(2, '0').toUpperCase());
                                    return [hex[0] + hex[1], hex[2] + 'FF', 'FE' + hex[3], hex[4] + hex[5]].join(':');
                                })();
                                return (
                                    <div className="space-y-6">
                                        <p className="text-xs text-slate-500">Trois calculateurs pour vérifier vos calculs d'examen instantanément. Tout est calculé dans votre navigateur, rien n'est envoyé.</p>
                                        {/* CIDR */}
                                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">🧮 Simulateur CIDR / IPv4</h4>
                                            <div className="flex flex-col md:flex-row gap-2">
                                                <input value={subCidr.ip} onChange={(e) => setSubCidr(s => ({ ...s, ip: e.target.value }))} placeholder="192.168.10.70" className="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-500" />
                                                <input type="number" min="1" max="32" value={subCidr.pfx} onChange={(e) => setSubCidr(s => ({ ...s, pfx: Number(e.target.value) }))} className="w-full md:w-24 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-500" />
                                            </div>
                                            {cidrRes && (
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                                                    {[['Réseau', cidrRes.network], ['Diffusion', cidrRes.broadcast], ['Masque', cidrRes.mask], ['Wildcard', cidrRes.wildcard], ['1re utilisable', cidrRes.first], ['Dernière utilisable', cidrRes.last], ['Hôtes utilisables', cidrRes.usable.toLocaleString('fr-FR')], ['Taille du bloc', cidrRes.size.toLocaleString('fr-FR')], ['Classe historique', cidrRes.cls], ['Type', cidrRes.priv]].map((kv, i) => (
                                                        <div key={i} className="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                                                            <span className="text-[9px] uppercase font-bold text-slate-500 block">{kv[0]}</span>
                                                            <span className="font-mono text-slate-900 dark:text-white break-all">{kv[1]}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {!cidrRes && subCidr.ip.trim() && <p className="text-[11px] text-red-500">Adresse IPv4 invalide.</p>}
                                        </div>
                                        {/* VLSM */}
                                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">📐 Simulateur VLSM — allocation du plus grand au plus petit</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input value={subVlsm.base} onChange={(e) => setSubVlsm(s => ({ ...s, base: e.target.value }))} placeholder="Base : 192.168.20.0/24" className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-500" />
                                                <input value={subVlsm.hosts} onChange={(e) => setSubVlsm(s => ({ ...s, hosts: e.target.value }))} placeholder="Besoins : 60, 25, 10, 2, 2" className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-500" />
                                            </div>
                                            {subVlsmResult && (subVlsmResult.error
                                                ? <p className="text-[11px] text-red-500">{subVlsmResult.error}</p>
                                                : (
                                                    <div className="space-y-2">
                                                        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                                                            <table className="w-full text-[11px]">
                                                                <thead className="bg-slate-100 dark:bg-slate-900/70">
                                                                    <tr><th className="p-2 text-left font-bold text-slate-600 dark:text-slate-300">Hôtes</th><th className="p-2 text-left font-bold text-slate-600 dark:text-slate-300">Préfixe</th><th className="p-2 text-left font-bold text-slate-600 dark:text-slate-300">Réseau</th><th className="p-2 text-left font-bold text-slate-600 dark:text-slate-300">Utilisables</th><th className="p-2 text-left font-bold text-slate-600 dark:text-slate-300">Diffusion</th></tr>
                                                                </thead>
                                                                <tbody>
                                                                    {subVlsmResult.rows.map((r, i) => (
                                                                        <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
                                                                            <td className="p-2 font-bold text-slate-900 dark:text-white">{r.h}</td>
                                                                            <td className="p-2 font-mono text-brand-600 dark:text-brand-400">/{r.pfx}</td>
                                                                            <td className="p-2 font-mono text-slate-700 dark:text-slate-300">{r.network}</td>
                                                                            <td className="p-2 font-mono text-slate-700 dark:text-slate-300">{r.first} → {r.last}</td>
                                                                            <td className="p-2 font-mono text-slate-700 dark:text-slate-300">{r.broadcast}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">✔ Espace restant : {subVlsmResult.remaining.toLocaleString('fr-FR')} adresses — prochaine libre : {subVlsmResult.nextFree}</p>
                                                    </div>
                                                ))}
                                        </div>
                                        {/* IPv6 */}
                                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">🌐 Simulateur IPv6 — analyse complète et EUI-64</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input value={subV6.addr} onChange={(e) => setSubV6(s => ({ ...s, addr: e.target.value }))} placeholder="Adresse : 2001:db8:1::a1:0:0:1" className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-500" />
                                                <input value={subV6.mac} onChange={(e) => setSubV6(s => ({ ...s, mac: e.target.value }))} placeholder="MAC : 00:1A:2B:3C:4D:5E" className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-500" />
                                            </div>
                                            {v6Res && (v6Res.error
                                                ? <p className="text-[11px] text-red-500">{v6Res.error}</p>
                                                : (
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
                                                        <div className="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 md:col-span-2">
                                                            <span className="text-[9px] uppercase font-bold text-slate-500 block">Forme développée</span>
                                                            <span className="font-mono text-slate-900 dark:text-white break-all">{v6Res.full}</span>
                                                        </div>
                                                        <div className="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                                                            <span className="text-[9px] uppercase font-bold text-slate-500 block">Abrégée</span>
                                                            <span className="font-mono text-brand-600 dark:text-brand-400 break-all">{v6Res.abbr}</span>
                                                        </div>
                                                        <div className="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 md:col-span-3">
                                                            <span className="text-[9px] uppercase font-bold text-slate-500 block">Type d'adresse</span>
                                                            <span className="font-mono text-slate-900 dark:text-white">{v6Res.type}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            {eui64 && (
                                                <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded text-[11px]">
                                                    <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase text-[9px] block">Identifiant EUI-64 (dérivé de la MAC)</span>
                                                    <span className="font-mono text-slate-900 dark:text-white">{eui64}</span>
                                                    <span className="text-slate-500"> — à coller derrière un préfixe /64 (ex : 2001:db8:1::{eui64.toLowerCase()})</span>
                                                </div>
                                            )}
                                        </div>
                                        {/* Hexadécimal */}
                                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">🔢 Conversions décimal / hexadécimal / binaire</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <input value={subHex.dec} onChange={(e) => { const v = e.target.value; const n = Number(v); setSubHex({ dec: v, hex: isNaN(n) ? '' : n.toString(16).toUpperCase() }); }} placeholder="Décimal : 255" className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-500" />
                                                <input value={subHex.hex} onChange={(e) => { const v = e.target.value.trim(); const n = parseInt(v, 16); setSubHex({ dec: isNaN(n) ? '' : String(n), hex: v.toUpperCase() }); }} placeholder="Hexadécimal : FF" className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-500" />
                                            </div>
                                            {(() => {
                                                const n = Number(subHex.dec);
                                                if (isNaN(n)) return null;
                                                return (
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                                                        {[['Décimal', n], ['Hexadécimal', '0x' + n.toString(16).toUpperCase()], ['Binaire', n.toString(2)], ['Octet (8 bits)', n.toString(2).padStart(8, '0')]].map((kv, i) => (
                                                            <div key={i} className="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                                                                <span className="text-[9px] uppercase font-bold text-slate-500 block">{kv[0]}</span>
                                                                <span className="font-mono text-slate-900 dark:text-white break-all">{kv[1]}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                );
                            })()}

                        </div>
                    </div>
                );
            };

            // Rendu Onglet Examen Blanc
            return (
                <div className="min-h-screen flex flex-col">
                    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
                        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
                            {/* Logo + titre cliquables : retour au Dashboard depuis n'importe quelle page */}
                            <button
                                onClick={() => { setCurrentTab('dashboard'); window.scrollTo({ top: 0 }); }}
                                aria-label="Retour à l'accueil (Dashboard)"
                                title="Retour au Dashboard"
                                className="flex items-center gap-3 text-left rounded-lg px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
                            >
                                {!logoError ? (
                                    <img
                                        src={logoUrl}
                                        alt="Logo Cours IT"
                                        onError={() => setLogoError(true)}
                                        className="h-9 w-auto object-contain transition-opacity duration-200 rounded"
                                    />
                                ) : (
                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-700 to-sky-500 text-white flex items-center justify-center font-bold text-base shadow-md">
                                        IT
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-semibold italic text-blue-800 dark:text-blue-300" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>Plateforme de révisions pour tous</span>
                                </div>
                            </button>

                            {/* Barre de Recherche Plein Texte Dynamic */}
                            <div className="w-full md:w-96 lg:w-[26rem]">
                                <div className="relative">
                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                    <input
                                        type="text"
                                        aria-label="Rechercher un cours, un mot-clé"
                                        placeholder="Rechercher un cours, un code, un mot-clé…"
                                        value={searchQuery}
                                        onChange={(e) => { setSearchQuery(e.target.value); if (currentTab !== 'courses') setCurrentTab('courses'); }}
                                        className="w-full bg-slate-100/70 dark:bg-slate-900/70 backdrop-blur border border-slate-300 dark:border-slate-700 rounded-full pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all shadow-sm hover:shadow-md"
                                    />
                                </div>
                            </div>
                                {searchQuery && (
                                    <p className="text-[10px] mt-1 text-slate-500 dark:text-slate-400" role="status">
                                        🔎 « {searchQuery} » : {filteredCourses.length} cours correspondant(s) dans l'onglet « Cours » (titres, codes, descriptions et sommaires).
                                        {filteredCourses.length === 0 && searchHints && (searchHints.inGloss + searchHints.inCmds + searchHints.inVocab) > 0 && (
                                            <span className="text-brand-500 font-semibold"> · Le terme existe par ailleurs : Glossaire ({searchHints.inGloss}), Commandes ({searchHints.inCmds}), Vocabulaire ({searchHints.inVocab}).</span>
                                        )}
                                        {filteredCourses.length === 0 && (searchHints === null || (searchHints.inGloss + searchHints.inCmds + searchHints.inVocab) === 0) && (
                                            <span> · Aucune correspondance ailleurs dans le site.</span>
                                        )}
                                    </p>
                                )}
                            <div className="flex items-center gap-3">
                                {/* Réglage de la taille de police (FONC-22) */}
                                <div className="flex items-center gap-1" role="group" aria-label="Taille de la police">
                                    <button
                                        onClick={() => setFontScale('93')}
                                        aria-label="Police plus petite"
                                        title="Réduire la taille du texte"
                                        className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-600"
                                    >
                                        A−
                                    </button>
                                    <button
                                        onClick={() => setFontScale('110')}
                                        aria-label="Police plus grande"
                                        title="Augmenter la taille du texte"
                                        className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-600"
                                    >
                                        A+
                                    </button>
                                    <button
                                        onClick={() => setFontScale('100')}
                                        aria-label="Taille de police normale"
                                        title="Taille normale"
                                        className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-600"
                                    >
                                        A
                                    </button>
                                </div>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    aria-label={darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
                                    title={darkMode ? 'Mode clair' : 'Mode sombre'}
                                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                >
                                    {darkMode ? (
                                        <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    ) : (
                                        <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Navigation principale finale */}
                        <nav aria-label="Navigation principale" className="bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800">
                            <div className="max-w-7xl mx-auto px-4 flex space-x-1 overflow-x-auto text-xs font-medium py-2">
                                {[
                                    { id: 'dashboard', label: 'Dashboard' },
                                    { id: 'courses', label: 'Cours & Fiches' },
                                    { id: 'essentiels', label: 'Les Indispensables' },
                                    { id: 'qcm', label: 'Banque QCM' },
                                    { id: 'labs', label: 'Labos Guidés' },
                                    { id: 'commands', label: 'Commandes' },
                                    { id: 'scripts', label: 'Scripts' },
                                    { id: 'depannage', label: 'Dépannage' },
                                    { id: 'glossary', label: 'Glossaire' },
                                    { id: 'vocab', label: 'Vocabulaire Anglais' }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setCurrentTab(tab.id)}
                                        aria-current={currentTab === tab.id ? 'page' : undefined}
                                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                                            currentTab === tab.id
                                                ? 'bg-brand-600 text-white font-bold'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                                        }`}
                                    >
                                        <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            {tab.id === 'dashboard' && <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />}
                                            {tab.id === 'courses' && <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                                            {tab.id === 'essentiels' && <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />}
                                            {tab.id === 'essentiels' && <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
                                            {tab.id === 'qcm' && <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />}
                                            {tab.id === 'labs' && <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />}
                                            {tab.id === 'commands' && <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                                            {tab.id === 'scripts' && <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />}
                                            {tab.id === 'depannage' && <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />}
                                            {tab.id === 'glossary' && <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                                            {tab.id === 'vocab' && <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />}
                                        </svg>
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </nav>
                    </header>

                    <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 pb-24 md:pb-6">
                        {currentTab === 'dashboard' && renderDashboard()}
                        {currentTab === 'courses' && renderCourses()}
                        {currentTab === 'essentiels' && renderEssentielsTab()}
                        {currentTab === 'qcm' && renderQCM()}
                        {currentTab === 'labs' && renderLabs()}
                        {currentTab === 'commands' && renderCommandsTab()}
                        {currentTab === 'scripts' && renderScriptsTab()}
                        {currentTab === 'depannage' && renderDepannageTab()}
                        {currentTab === 'glossary' && renderGlossaryTab()}
                        {currentTab === 'vocab' && renderVocabTab()}
                    </main>

                    {/* Navigation rapide fixe — mobile uniquement */}
                    <nav aria-label="Navigation rapide mobile" className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
                        <div className="grid grid-cols-5 text-[10px] font-semibold">
                            {[
                                { id: 'dashboard', label: 'Accueil' },
                                { id: 'courses', label: 'Cours' },
                                { id: 'qcm', label: 'QCM' },
                                { id: 'labs', label: 'Labos' },
                                { id: 'glossary', label: 'Glossaire' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setCurrentTab(tab.id)}
                                    aria-current={currentTab === tab.id ? 'page' : undefined}
                                    className={`py-2 flex flex-col items-center gap-0.5 min-h-[52px] transition-colors ${
                                        currentTab === tab.id
                                            ? 'text-brand-600 dark:text-sky-300 bg-brand-500/10'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        {tab.id === 'dashboard' && <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />}
                                        {tab.id === 'courses' && <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                                        {tab.id === 'qcm' && <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />}
                                        {tab.id === 'labs' && <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />}
                                        {tab.id === 'glossary' && <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                                    </svg>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </nav>

                    <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-4 text-xs text-slate-500 dark:text-slate-400 space-y-3">
                        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-3 justify-between items-center">
                            <span>Plateforme de révision autonome TSSR, AIS et CCNA 200-301 · Contenu vérifié le {CONTENT_LAST_CHECK}</span>
                            <div className="flex gap-3">
                                <button onClick={reportIssue} className="font-semibold text-amber-600 dark:text-amber-400 hover:underline">
                                    ⚠️ Signaler une erreur dans cette page
                                </button>
                            </div>
                        </div>
                        <details className="max-w-7xl mx-auto px-4">
                            <summary className="cursor-pointer font-semibold text-slate-600 dark:text-slate-300">Mentions légales & confidentialité (NF-11)</summary>
                            <div className="mt-2 space-y-1 leading-relaxed">
                                <p><strong>Éditeur :</strong> site de révision édité à titre personnel par son constructeur, à des fins pédagogiques. Coordonnées de l'éditeur : à compléter (e-mail de contact à renseigner ici).</p>
                                <p><strong>Hébergement :</strong> usage local ou hébergement statique (GitHub Pages ou équivalent) ; aucune donnée personnelle n'est transmise à un serveur par ce site.</p>
                                <p><strong>Confidentialité (RGPD, NF-10) :</strong> votre progression, vos scores et vos listes d'erreurs sont stockés uniquement dans votre navigateur (localStorage). Aucune donnée personnelle ne quitte votre appareil.</p>
                                <p><strong>Avertissement :</strong> les examens blancs et QCM n'ont aucune valeur de certification. Contenus rédigés pour ce site ; les référentiels officiels (TP-01351, TP-01352, blueprint Cisco) sont cités, jamais recopiés.</p>
                            </div>
                        </details>
                    </footer>
                </div>
            );
        }

        
    

export default App;
