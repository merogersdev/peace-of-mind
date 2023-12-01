import { useState, useContext, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { MdModeEdit, MdDelete } from "react-icons/md";
import axios from "axios";

import formatDate from "../../utils/date";

import Section from "../../components/Section/Section";
import Message from "../../components/Message/Message";

import AuthContext from "../../context/AuthContext";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";

export default function Dashboard({ icon }) {
  const { user, quote, entries, setEntries, refreshAuth } =
    useContext(AuthContext);

  const token = sessionStorage.getItem("token");

  const entriesPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [currentEntries, setCurrentEntries] = useState([]);

  // If token, get user details.
  useEffect(() => {
    if (!token) return;
    refreshAuth();
  }, []);

  useEffect(() => {
    const lastEntryIndex = currentPage * entriesPerPage;
    const firstEntryIndex = lastEntryIndex - entriesPerPage;

    if (entries) {
      setCurrentEntries(entries.slice(firstEntryIndex, lastEntryIndex));
    }
  }, [entries, currentPage]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/entries/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const updatedEntries = entries.filter((entry) => entry.id !== id);
      setEntries(updatedEntries);
    } catch (error) {
      console.error(error);
    }
  };

  // If no token, return to home
  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    user && (
      <>
        <Section>
          <div className="section__icon-container">{icon}</div>
          <h1 className="section__h1 ">Dashboard</h1>
        </Section>
        <div className="card__container">
          <Card>
            <h3 className="card__h3">Journal Entries</h3>
            <div className="card__entry-length">{entries.length}</div>

            <Link
              to="/add-entry"
              className="card__button card__button--primary"
            >
              Add Entry
            </Link>
          </Card>
          <Card right>
            <h3 className="card__h3">My Info</h3>
            <div className="card__user">
              <div className="card__user-info">
                <span>Name:</span>
                <span>
                  {user.first_name} {user.last_name}
                </span>
              </div>
              <div className="card__user-info">
                <span>Email:</span>
                <span>{user.email}</span>
              </div>
            </div>
            <Link to="/add-entry" className="card__button card__button--dark">
              Edit
            </Link>
          </Card>
        </div>
        <Section>
          <h1 className="section__h1 section__h1--no-icon">Words of Wisdom</h1>
          <p className="section__p section__p--quote">{quote.quote}</p>
          <p className="section__p section__p--author">{quote.author}</p>
        </Section>
        <Section>
          <h1 className="section__h1 section__h1--no-icon">Entry Archive</h1>

          <ul className="section__entry-list">
            {currentEntries.length === 0 ? (
              <Message type="info" message="No entries to display..." />
            ) : (
              ""
            )}
            {currentEntries.map((entry) => (
              <li key={entry.id} className="section__entry-listitem">
                <div className="section__entry-info">
                  <h3 className="section__h3">{entry.title}</h3>
                  {entry.updated_at ? (
                    <p className="section__p--author">
                      Updated: {formatDate(entry.updated_at)}
                    </p>
                  ) : (
                    <p className="section__p--author">
                      Created: {formatDate(entry.created_at)}
                    </p>
                  )}
                </div>
                <div className="section__entry-interact">
                  <Link
                    to={`/edit-entry/${entry.id}`}
                    className="section__button section__button--dark section__button--big-icon section__button--spacer"
                  >
                    <MdModeEdit />
                  </Link>
                  <button
                    type="button"
                    className="section__button section__button--delete section__button--big-icon"
                  >
                    <MdDelete onClick={() => handleDelete(entry.id)} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Pagination
            totalEntries={entries.length}
            entriesPerPage={entriesPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Section>
      </>
    )
  );
}
