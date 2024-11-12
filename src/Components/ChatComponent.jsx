import React, { useState, useEffect, useRef } from 'react';
import { ref, push, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';
import { useAuth } from '../Helpers/AuthContext';
import styles from './ChatComponent.module.css';

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const { user } = useAuth();
    const textareaRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const messagesRef = ref(database, 'messages');
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            const messagesList = data ? Object.values(data) : [];
            setMessages(messagesList);
            scrollToBottom();
        });
    }, []);

    const handleSend = () => {
        if (input.trim()) {
            const messagesRef = ref(database, 'messages');
            const newMessage = {
                text: input,
                sender: user.displayName,
                date: new Date().toISOString()
            };
            push(messagesRef, newMessage);
            setInput('');
            resetTextareaHeight();
            setTimeout(scrollToBottom, 100); // Ensure scroll updates after state change
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
        adjustTextareaHeight();
    };

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // Set max height to 200px
    };

    const resetTextareaHeight = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
    };

    const toggleChat = () => {
        setIsVisible(!isVisible);
        if (!isVisible) {
            setTimeout(scrollToBottom, 0);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);

        if (date.toDateString() === now.toDateString()) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleString();
        }
    };

    return (
        <>
            <button className={styles.chatButton} onClick={toggleChat}>
                <i className={`fas fa-comments ${styles.chatButtonIcon}`}></i>
            </button>
            <div className={`${styles.chatContainer} ${isVisible ? styles.visible : ''}`}>
                <div className={styles.chatHeader}>
                    Chat
                    <button className={styles.closeButton} onClick={toggleChat}>&times;</button>
                </div>
                <div className={styles.chatBody}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`${styles.message} ${msg.sender === user.displayName ? styles.myMessage : styles.otherMessage}`}>
                            <div className={styles.messageHeader}>
                                <span className={styles.sender}>{msg.sender}</span>
                                <span className={styles.date}>{formatDate(msg.date)}</span>
                            </div>
                            <div className={styles.messageText} style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className={styles.chatFooter}>
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className={styles.chatInput}
                        rows="1"
                        style={{ maxHeight: '200px', overflowY: 'auto' }}
                    />
                    <button onClick={handleSend} className={styles.sendButton}>
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChatComponent;