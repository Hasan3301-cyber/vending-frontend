import React, { useState, useRef, useEffect } from 'react';

const GEMINI_API_KEY = 'AIzaSyBi3Xe-QavZE51nfN9F0SEjY4NBOwZ5xzg';

const ChatApp = () => {
  const [conversations, setConversations] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [humanInput, setHumanInput] = useState('');
  const [adminReplies, setAdminReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const staticResponses = {
    "who are you": "I am an AI created by Mahmudul Hasan to help people in the legal field.",
    "what's your name": "I don't have a name, but I was created by Mahmudul Hasan to assist with legal queries.",
  };

  const getAIResponse = async (text) => {
    const lowerText = text.toLowerCase();
    if (staticResponses[lowerText]) return staticResponses[lowerText];

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text }] }] })
        }
      );
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "AI did not respond.";
    } catch (error) {
      console.error(error);
      return "Something went wrong while fetching AI response.";
    }
  };

  const paragraphify = (text) => {
    return text
      .split(/\n\s*\n|\*\*/)
      .filter(Boolean)
      .map((block, index) => <p key={index} style={{ marginBottom: '1rem' }}>{block.trim()}</p>);
  };

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const question = aiInput;
    setAiInput('');
    setLoading(true);

    // Add loading message
    setConversations((prev) => [...prev, { question, ai: 'loading...', human: '' }]);
    setAdminReplies((prev) => [...prev, '']);

    const ai = await getAIResponse(question);

    setConversations((prev) => {
      const updated = [...prev];
      updated[updated.length - 1].ai = ai;
      return updated;
    });

    setLoading(false);
  };

  const handleHumanSubmit = async (e) => {
    e.preventDefault();
    if (!humanInput.trim()) return;
    const question = humanInput;
    setHumanInput('');
    setConversations((prev) => [...prev, { question, ai: '', human: 'Pending...' }]);
    setAdminReplies((prev) => [...prev, '']);
  };

  const handleAdminReply = (index) => {
    if (!adminReplies[index]?.trim()) return;
    const updated = [...conversations];
    updated[index].human = adminReplies[index];
    setConversations(updated);

    const replies = [...adminReplies];
    replies[index] = '';
    setAdminReplies(replies);
  };

  const updateAdminReplyInput = (index, value) => {
    const updated = [...adminReplies];
    updated[index] = value;
    setAdminReplies(updated);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations]);

  return (
    <>
      <style>
        {`
          @keyframes fadeSlideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
            }
            50% {
              box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
            }
          }

          @keyframes dotFlashing {
            0% { background-color: #3b82f6; }
            50%, 100% { background-color: rgba(59, 130, 246, 0.3); }
          }

          .dot-flashing {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 6px;
            background-color: #3b82f6;
            animation: dotFlashing 0.8s infinite alternate;
          }

          .animated-bg {
            background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1a1a2e);
            background-size: 400% 400%;
            animation: gradientFlow 8s ease infinite;
          }

          .message-enter {
            animation: fadeSlideIn 0.5s ease-out;
          }

          .panel-hover:hover {
            transform: translateY(-2px);
            transition: transform 0.3s ease;
          }

          .button-hover:hover {
            animation: pulse 0.3s ease;
          }

          .floating-element {
            animation: float 3s ease-in-out infinite;
          }

          .glow-effect {
            animation: glow 2s ease-in-out infinite;
          }
        `}
      </style>

      <div style={styles.container} className="animated-bg">
        {/* AI Panel */}
        <div style={styles.panel} className="panel-hover floating-element">
          <h2 style={styles.header}>AI Legal Assistant</h2>
          <div style={styles.chatBox}>
            {conversations.map((conv, i) => conv.ai && (
              <div key={i} style={styles.messageBlock} className="message-enter">
                <div style={styles.userMessage}>{conv.question}</div>
                <div style={styles.aiMessage}>
                  <strong>AI:</strong>{' '}
                  {conv.ai === 'loading...' ? (
                    <em><span className="dot-flashing"></span> Generating response...</em>
                  ) : (
                    paragraphify(conv.ai)
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef}></div>
          </div>
          <div style={styles.inputArea}>
            <input
              style={styles.input}
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ask AI Assistant..."
              onKeyPress={(e) => e.key === 'Enter' && handleAiSubmit(e)}
            />
            <button onClick={handleAiSubmit} style={styles.button} className="button-hover glow-effect">Send</button>
          </div>
        </div>

        <div style={styles.separator}></div>

        {/* Human Panel */}
        <div style={styles.panel} className="panel-hover floating-element">
          <h2 style={styles.header}>HUMAN Assistant</h2>
          <div style={styles.chatBox}>
            {conversations.map((conv, i) => conv.human && (
              <div key={i} style={styles.messageBlock} className="message-enter">
                <div style={styles.userMessage}>{conv.question}</div>
                <div style={styles.humanMessage}>
                  <strong>Human:</strong>{' '}
                  {conv.human !== 'Pending...' ? conv.human : <em>Waiting for admin reply...</em>}
                </div>
                {conv.human === 'Pending...' && (
                  <div style={styles.replyInputArea}>
                    <input
                      style={styles.input}
                      value={adminReplies[i] || ''}
                      onChange={(e) => updateAdminReplyInput(i, e.target.value)}
                      placeholder="Type admin reply..."
                    />
                    <button
                      type="button"
                      onClick={() => handleAdminReply(i)}
                      style={{ ...styles.button, backgroundColor: '#f59e0b' }}
                      className="button-hover"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={styles.inputArea}>
            <input
              style={styles.input}
              value={humanInput}
              onChange={(e) => setHumanInput(e.target.value)}
              placeholder="Ask Human Assistant..."
              onKeyPress={(e) => e.key === 'Enter' && handleHumanSubmit(e)}
            />
            <button onClick={handleHumanSubmit} style={styles.button} className="button-hover glow-effect">Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    padding: '20px',
    gap: '20px',
    fontFamily: 'Segoe UI, sans-serif',
    position: 'relative',
  },
  panel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  separator: {
    width: '10px',
  },
  header: {
    padding: '1rem',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    color: '#ffffff',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  },
  chatBox: {
    flex: 1,
    padding: '1rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  messageBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1e40af',
    color: 'white',
    padding: '10px 16px',
    borderRadius: '18px 18px 0 18px',
    maxWidth: '75%',
    fontSize: '15px',
    boxShadow: '0 4px 15px rgba(30, 64, 175, 0.3)',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(224, 247, 250, 0.9)',
    color: '#111',
    padding: '10px 16px',
    borderRadius: '18px 18px 18px 0',
    maxWidth: '75%',
    fontSize: '15px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  humanMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 247, 237, 0.9)',
    color: '#111',
    padding: '10px 16px',
    borderRadius: '18px 18px 18px 0',
    maxWidth: '75%',
    fontSize: '15px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  replyInputArea: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  inputArea: {
    display: 'flex',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '0.75rem',
    backgroundColor: 'rgba(250, 250, 250, 0.1)',
  },
  input: {
    flex: 1,
    padding: '0.5rem 1rem',
    fontSize: '15px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '9999px',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#111',
  },
  button: {
    padding: '0.5rem 1.2rem',
    borderRadius: '9999px',
    border: 'none',
    fontSize: '15px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default ChatApp;
