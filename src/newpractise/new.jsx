import React, { useState, useRef, useEffect } from 'react';

const GEMINI_API_KEY = 'AIzaSyDUjefpCwgt1D3Z-q4QUmKpZ5UkrjWzotY';

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
          headers: { 'Content-Type': 'application/json' },
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
    <div style={styles.container}>
      {/* AI Panel */}
      <div style={styles.panel}>
        <h2 style={styles.header}>AI Legal Assistant</h2>
        <div style={styles.chatBox}>
          {conversations.map((conv, i) => conv.ai && (
            <div key={i} style={styles.messageBlock}>
              <div style={styles.userMessage}>{conv.question}</div>
              <div style={styles.aiMessage}>
                <strong>AI:</strong>{' '}
                {conv.ai === 'loading...' ? (
                  <em>Generating response...</em>
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
          <button onClick={handleAiSubmit} style={styles.button}>Send</button>
        </div>
      </div>

      <div style={styles.separator}></div>

      {/* Human Panel */}
      <div style={styles.panel}>
        <h2 style={styles.header}>HUMAN Assistant</h2>
        <div style={styles.chatBox}>
          {conversations.map((conv, i) => conv.human && (
            <div key={i} style={styles.messageBlock}>
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
          <button onClick={handleHumanSubmit} style={styles.button}>Send</button>
        </div>
      </div>
    </div>
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
  },
};

export default ChatApp;
