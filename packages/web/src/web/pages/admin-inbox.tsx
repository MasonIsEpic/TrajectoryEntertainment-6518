import { useEffect, useState } from "react";
import { Search, Mail, Archive, RefreshCw, ArrowUpRight, Circle, Check } from "lucide-react";
import { useInbox, useUpdateInquiry } from "../queries/cms";
const date = (value: Date) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
export default function AdminInbox() {
  const inbox = useInbox();
  const update = useUpdateInquiry();
  const [filter, setFilter] = useState("Inbox");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => {
    document.title = "Inquiries | Trajectory CMS";
  }, []);
  const items = inbox.data || [];
  const unread = items.filter((i) => !i.read && !i.archived).length;
  const visible = items
    .filter((i) =>
      filter === "Archived"
        ? i.archived
        : filter === "Unread"
          ? !i.read && !i.archived
          : !i.archived,
    )
    .filter((i) =>
      `${i.name} ${i.email} ${i.company || ""} ${i.service} ${i.message}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  const inquiry = items.find((i) => i.id === selected);
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">YOUR CONVERSATIONS</p>
          <h1>
            INQUIRIES<span>.</span>
          </h1>
          <p>
            New projects start here. {unread} unread {unread === 1 ? "inquiry" : "inquiries"}.
          </p>
        </div>
        <button
          className="admin-button"
          onClick={() => inbox.refetch()}
          disabled={inbox.isFetching}
        >
          <RefreshCw size={15} />
          {inbox.isFetching ? "Refreshing…" : "Refresh"}
        </button>
      </div>
      <div className="admin-toolbar">
        <div className="admin-filters">
          {["Inbox", "Unread", "Archived"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={filter === f ? "selected" : ""}
            >
              {f}
              {f === "Unread" && <span>{unread}</span>}
            </button>
          ))}
        </div>
        <label className="admin-search">
          <Search size={16} />
          <input
            aria-label="Search inquiries"
            placeholder="Search inquiries…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
      {inbox.isLoading ? (
        <div className="admin-empty">Loading your inbox…</div>
      ) : inbox.isError ? (
        <div className="admin-empty" role="alert">
          Unable to load inquiries. <button onClick={() => inbox.refetch()}>Try again</button>
        </div>
      ) : (
        <div className="inbox-layout">
          <section className="inquiry-list" aria-label="Inquiries">
            {visible.length ? (
              visible.map((i) => (
                <button
                  key={i.id}
                  className={
                    "inquiry-item" +
                    (selected === i.id ? " selected" : "") +
                    (!i.read ? " unread" : "")
                  }
                  onClick={() => {
                    setSelected(i.id);
                    if (!i.read) update.mutate({ id: i.id, read: true });
                  }}
                >
                  <div>
                    <strong>{i.name}</strong>
                    <time>{date(i.createdAt)}</time>
                  </div>
                  <span>{i.service}</span>
                  <p>{i.message}</p>
                  <div className="inquiry-item-bottom">
                    <span>{i.company || i.email}</span>
                    {!i.read && <span className="unread-dot" aria-label="Unread" />}
                  </div>
                </button>
              ))
            ) : (
              <div className="admin-empty">
                <Mail size={30} />
                <h2>
                  {search
                    ? "NO MATCHES."
                    : filter === "Archived"
                      ? "NOTHING ARCHIVED."
                      : filter === "Unread"
                        ? "ALL CAUGHT UP."
                        : "YOUR NEXT PROJECT."}
                </h2>
                <p>
                  {search
                    ? "Try a different search."
                    : "Contact-form messages will appear here. Refresh to check for new inquiries."}
                </p>
              </div>
            )}
          </section>
          <section className="inquiry-detail" aria-label="Selected inquiry">
            {inquiry ? (
              <>
                <div className="detail-top">
                  <span className="status-pill">
                    {inquiry.archived ? "Archived" : inquiry.read ? "Read" : "Unread"}
                  </span>
                  <span>{date(inquiry.createdAt)}</span>
                </div>
                <h2>{inquiry.name}</h2>
                <p className="detail-service">{inquiry.service}</p>
                <dl>
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href={"mailto:" + inquiry.email}>
                        {inquiry.email}
                        <ArrowUpRight size={13} />
                      </a>
                    </dd>
                  </div>
                  {inquiry.company && (
                    <div>
                      <dt>Company</dt>
                      <dd>{inquiry.company}</dd>
                    </div>
                  )}
                  {inquiry.phone && (
                    <div>
                      <dt>Phone</dt>
                      <dd>
                        <a href={"tel:" + inquiry.phone.replace(/[^+\d]/g, "")}>{inquiry.phone}</a>
                      </dd>
                    </div>
                  )}
                </dl>
                <div className="inquiry-message">{inquiry.message}</div>
                <div className="inquiry-actions">
                  <a
                    className="button"
                    href={`mailto:${inquiry.email}?subject=${encodeURIComponent("Your Trajectory Entertainment inquiry")}`}
                  >
                    <Mail size={15} />
                    REPLY BY EMAIL
                  </a>
                  <button
                    className="admin-button"
                    disabled={update.isPending}
                    onClick={() => update.mutate({ id: inquiry.id, read: !inquiry.read })}
                  >
                    {inquiry.read ? <Circle size={15} /> : <Check size={15} />}Mark{" "}
                    {inquiry.read ? "unread" : "read"}
                  </button>
                  <button
                    className="admin-button"
                    disabled={update.isPending}
                    onClick={() => update.mutate({ id: inquiry.id, archived: !inquiry.archived })}
                  >
                    <Archive size={15} />
                    {inquiry.archived ? "Move to inbox" : "Archive"}
                  </button>
                </div>
                <p className="admin-note">
                  Reply opens your email app. Archiving keeps the original inquiry in your inbox
                  history.
                </p>
              </>
            ) : (
              <div className="detail-placeholder">
                <Mail size={38} />
                <h2>OPEN A CONVERSATION.</h2>
                <p>Select an inquiry to view its details.</p>
              </div>
            )}
          </section>
        </div>
      )}
      {update.isError && (
        <p className="form-error" role="alert">
          Your change could not be saved. Please try again.
        </p>
      )}
    </>
  );
}
