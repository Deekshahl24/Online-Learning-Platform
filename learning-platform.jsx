import { useState, useEffect, useRef } from "react";

const COURSES = [
  {
    id: 1, title: "The Art of Data Storytelling", instructor: "Priya Nair",
    category: "Data Science", level: "Beginner", duration: "6h 40m",
    rating: 4.8, students: 12400, color: "#7F77DD",
    description: "Learn to transform raw numbers into compelling narratives that drive decisions.",
    icon: "📊",
    lessons: [
      { id: 1, title: "Why stories beat spreadsheets", duration: "12m", type: "video" },
      { id: 2, title: "The anatomy of a data narrative", duration: "18m", type: "video" },
      { id: 3, title: "Choosing your chart wisely", duration: "22m", type: "video" },
      { id: 4, title: "Color theory for data", duration: "15m", type: "reading" },
      { id: 5, title: "Practice: Redesign this chart", duration: "25m", type: "exercise" },
      { id: 6, title: "Presenting to stakeholders", duration: "20m", type: "video" },
    ]
  },
  {
    id: 2, title: "Machine Learning from Scratch", instructor: "Carlos Mendez",
    category: "AI & ML", level: "Intermediate", duration: "14h 20m",
    rating: 4.9, students: 31200, color: "#1D9E75",
    description: "Build intuition and implementation skills for core ML algorithms without the magic box.",
    icon: "🧠",
    lessons: [
      { id: 1, title: "Thinking like a machine", duration: "14m", type: "video" },
      { id: 2, title: "Linear regression by hand", duration: "30m", type: "video" },
      { id: 3, title: "Gradient descent explained", duration: "25m", type: "video" },
      { id: 4, title: "Classification fundamentals", duration: "28m", type: "video" },
      { id: 5, title: "Neural network intuition", duration: "35m", type: "video" },
      { id: 6, title: "Build a digit recognizer", duration: "45m", type: "exercise" },
      { id: 7, title: "Overfitting & regularization", duration: "22m", type: "reading" },
      { id: 8, title: "Capstone project", duration: "60m", type: "exercise" },
    ]
  },
  {
    id: 3, title: "Product Design Fundamentals", instructor: "Aiko Tanaka",
    category: "Design", level: "Beginner", duration: "8h 15m",
    rating: 4.7, students: 8900, color: "#D4537E",
    description: "From user research to pixel-perfect screens — a complete foundation in modern product design.",
    icon: "✏️",
    lessons: [
      { id: 1, title: "What designers actually do", duration: "10m", type: "video" },
      { id: 2, title: "Design thinking workshop", duration: "40m", type: "exercise" },
      { id: 3, title: "Wireframing fast", duration: "20m", type: "video" },
      { id: 4, title: "Typography that works", duration: "18m", type: "reading" },
      { id: 5, title: "Color systems", duration: "22m", type: "video" },
      { id: 6, title: "Your first high-fi mockup", duration: "50m", type: "exercise" },
    ]
  },
  {
    id: 4, title: "Backend Engineering with Go", instructor: "Sam Okafor",
    category: "Engineering", level: "Advanced", duration: "20h 00m",
    rating: 4.6, students: 5600, color: "#378ADD",
    description: "Build performant, production-ready APIs and services using Go's concurrency model.",
    icon: "⚙️",
    lessons: [
      { id: 1, title: "Why Go?", duration: "8m", type: "video" },
      { id: 2, title: "Go fundamentals crash course", duration: "45m", type: "video" },
      { id: 3, title: "Goroutines & channels", duration: "35m", type: "video" },
      { id: 4, title: "Building your first REST API", duration: "55m", type: "exercise" },
      { id: 5, title: "Database integration", duration: "40m", type: "video" },
      { id: 6, title: "Authentication & middleware", duration: "35m", type: "video" },
      { id: 7, title: "Testing in Go", duration: "30m", type: "reading" },
      { id: 8, title: "Deploying to production", duration: "45m", type: "exercise" },
      { id: 9, title: "Capstone: Build a URL shortener", duration: "90m", type: "exercise" },
    ]
  },
  {
    id: 5, title: "Financial Modelling Mastery", instructor: "Lena Fischer",
    category: "Finance", level: "Intermediate", duration: "10h 30m",
    rating: 4.8, students: 7200, color: "#BA7517",
    description: "Excel-based and beyond — rigorous financial models used at top investment banks.",
    icon: "💹",
    lessons: [
      { id: 1, title: "The modeller's mindset", duration: "15m", type: "video" },
      { id: 2, title: "P&L and balance sheets", duration: "28m", type: "video" },
      { id: 3, title: "DCF from first principles", duration: "40m", type: "video" },
      { id: 4, title: "Sensitivity analysis", duration: "22m", type: "exercise" },
      { id: 5, title: "LBO modelling", duration: "55m", type: "video" },
      { id: 6, title: "Final model challenge", duration: "60m", type: "exercise" },
    ]
  },
  {
    id: 6, title: "Writing That Moves People", instructor: "Maya Osei",
    category: "Writing", level: "Beginner", duration: "5h 45m",
    rating: 4.9, students: 22100, color: "#D85A30",
    description: "Develop a distinct voice and craft prose that resonates — from essays to email.",
    icon: "🖊️",
    lessons: [
      { id: 1, title: "Finding your voice", duration: "12m", type: "video" },
      { id: 2, title: "The sentence is the unit of thought", duration: "20m", type: "reading" },
      { id: 3, title: "Editing ruthlessly", duration: "18m", type: "video" },
      { id: 4, title: "Persuasion without manipulation", duration: "22m", type: "video" },
      { id: 5, title: "Write one essay, get feedback", duration: "45m", type: "exercise" },
    ]
  },
];

const CATEGORIES = ["All", "Data Science", "AI & ML", "Design", "Engineering", "Finance", "Writing"];
const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const typeIcon = { video: "▶", reading: "📖", exercise: "⚡" };
const typeLabel = { video: "Video", reading: "Reading", exercise: "Exercise" };

export default function App() {
  const [view, setView] = useState("browse"); // browse | course | learn
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [enrollments, setEnrollments] = useState({});
  const [progress, setProgress] = useState({});
  const [filterCat, setFilterCat] = useState("All");
  const [filterLevel, setFilterLevel] = useState("All Levels");
  const [search, setSearch] = useState("");
  const [lessonTimer, setLessonTimer] = useState(0);
  const [lessonActive, setLessonActive] = useState(false);
  const [lessonDone, setLessonDone] = useState(false);
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const enrolledCourses = COURSES.filter(c => enrollments[c.id]);

  const filteredCourses = COURSES.filter(c => {
    const matchCat = filterCat === "All" || c.category === filterCat;
    const matchLevel = filterLevel === "All Levels" || c.level === filterLevel;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchLevel && matchSearch;
  });

  const getCourseProgress = (courseId) => {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return 0;
    const done = (progress[courseId] || []).length;
    return Math.round((done / course.lessons.length) * 100);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const enroll = (courseId) => {
    setEnrollments(e => ({ ...e, [courseId]: true }));
    showToast("Enrolled! Start learning anytime.");
  };

  const openLesson = (course, lesson) => {
    const done = (progress[course.id] || []).includes(lesson.id);
    setActiveCourse(course);
    setActiveLesson(lesson);
    setLessonDone(done);
    setLessonActive(false);
    setLessonTimer(0);
    setView("learn");
  };

  const startLesson = () => {
    setLessonActive(true);
    setLessonTimer(0);
    timerRef.current = setInterval(() => setLessonTimer(t => t + 1), 1000);
  };

  const completeLesson = () => {
    clearInterval(timerRef.current);
    setLessonActive(false);
    setLessonDone(true);
    const cid = activeCourse.id;
    const lid = activeLesson.id;
    setProgress(p => {
      const prev = p[cid] || [];
      if (prev.includes(lid)) return p;
      return { ...p, [cid]: [...prev, lid] };
    });
    showToast("Lesson complete! Great work.");
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background-tertiary)", fontFamily: "'Georgia', serif", position: "relative" }}>
      {toast && (
        <div style={{
          position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
          background: "#2C2C2A", color: "#F1EFE8", padding: "10px 22px",
          borderRadius: 30, fontSize: 14, fontFamily: "'Georgia', serif",
          zIndex: 9999, letterSpacing: "0.02em", whiteSpace: "nowrap",
          boxShadow: "0 4px 20px rgba(0,0,0,0.18)"
        }}>{toast}</div>
      )}

      {/* Header */}
      <header style={{
        background: "var(--color-background-primary)",
        borderBottom: "0.5px solid var(--color-border-tertiary)",
        padding: "0 32px", height: 60, display: "flex", alignItems: "center",
        justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <span onClick={() => setView("browse")} style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontWeight: 700, fontSize: 22, letterSpacing: "-0.5px", cursor: "pointer", color: "var(--color-text-primary)" }}>
            <span style={{ color: "#7F77DD" }}>cur</span>so
          </span>
          <nav style={{ display: "flex", gap: 4 }}>
            {[["browse", "Explore"], ["my-learning", "My Learning"]].map(([v, label]) => (
              <button key={v} onClick={() => setView(v)} style={{
                background: view === v ? "var(--color-background-secondary)" : "transparent",
                border: "none", borderRadius: 8, padding: "6px 14px",
                fontSize: 14, fontFamily: "var(--font-sans)", cursor: "pointer",
                color: view === v ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                fontWeight: view === v ? 500 : 400
              }}>{label}</button>
            ))}
          </nav>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#7F77DD", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontFamily: "var(--font-sans)", fontWeight: 500 }}>U</div>
        </div>
      </header>

      {/* Browse view */}
      {view === "browse" && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontSize: 38, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-1px", color: "var(--color-text-primary)" }}>
              Learn what matters<br /><span style={{ color: "#7F77DD" }}>to you</span>
            </h1>
            <p style={{ color: "var(--color-text-secondary)", fontSize: 16, fontFamily: "var(--font-sans)", margin: "0 0 24px" }}>
              {COURSES.length} courses · built by practitioners
            </p>
            <input
              type="text" placeholder="Search courses, topics, instructors…"
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", maxWidth: 460, padding: "10px 16px", borderRadius: 10, border: "0.5px solid var(--color-border-secondary)", fontSize: 15, fontFamily: "var(--font-sans)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", boxSizing: "border-box" }}
            />
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setFilterCat(cat)} style={{
                padding: "5px 14px", borderRadius: 20, fontSize: 13,
                fontFamily: "var(--font-sans)", cursor: "pointer",
                border: filterCat === cat ? "1.5px solid #7F77DD" : "0.5px solid var(--color-border-tertiary)",
                background: filterCat === cat ? "#EEEDFE" : "var(--color-background-primary)",
                color: filterCat === cat ? "#534AB7" : "var(--color-text-secondary)", fontWeight: filterCat === cat ? 500 : 400
              }}>{cat}</button>
            ))}
            <div style={{ width: 1, background: "var(--color-border-tertiary)", margin: "0 4px" }} />
            {LEVELS.map(lvl => (
              <button key={lvl} onClick={() => setFilterLevel(lvl)} style={{
                padding: "5px 14px", borderRadius: 20, fontSize: 13,
                fontFamily: "var(--font-sans)", cursor: "pointer",
                border: filterLevel === lvl ? "1.5px solid #1D9E75" : "0.5px solid var(--color-border-tertiary)",
                background: filterLevel === lvl ? "#E1F5EE" : "var(--color-background-primary)",
                color: filterLevel === lvl ? "#0F6E56" : "var(--color-text-secondary)", fontWeight: filterLevel === lvl ? 500 : 400
              }}>{lvl}</button>
            ))}
          </div>

          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", fontFamily: "var(--font-sans)", marginBottom: 20 }}>
            {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {filteredCourses.map(course => (
              <CourseCard
                key={course.id} course={course}
                enrolled={enrollments[course.id]}
                progress={getCourseProgress(course.id)}
                onClick={() => { setActiveCourse(course); setView("course"); }}
              />
            ))}
          </div>
          {filteredCourses.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--color-text-secondary)", fontFamily: "var(--font-sans)", fontSize: 15 }}>
              No courses match your filters.
            </div>
          )}
        </div>
      )}

      {/* My Learning view */}
      {view === "my-learning" && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontSize: 30, fontWeight: 700, margin: "0 0 8px", color: "var(--color-text-primary)" }}>My Learning</h2>
          <p style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-sans)", fontSize: 15, marginBottom: 32 }}>
            {enrolledCourses.length} course{enrolledCourses.length !== 1 ? "s" : ""} enrolled
          </p>
          {enrolledCourses.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>📚</div>
              <p style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-secondary)", fontSize: 16 }}>No courses yet.</p>
              <button onClick={() => setView("browse")} style={{ marginTop: 12, padding: "10px 24px", borderRadius: 10, border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", fontSize: 14, fontFamily: "var(--font-sans)", cursor: "pointer", color: "var(--color-text-primary)" }}>Browse courses</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {enrolledCourses.map(course => {
                const pct = getCourseProgress(course.id);
                return (
                  <div key={course.id} style={{
                    background: "var(--color-background-primary)", borderRadius: 14,
                    border: "0.5px solid var(--color-border-tertiary)",
                    padding: "20px 24px", display: "flex", alignItems: "center", gap: 20
                  }}>
                    <div style={{ fontSize: 36, flexShrink: 0 }}>{course.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <div>
                          <p style={{ fontFamily: "'Georgia', serif", fontWeight: 700, fontSize: 17, margin: 0, color: "var(--color-text-primary)" }}>{course.title}</p>
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-text-secondary)", margin: "2px 0 0" }}>{course.instructor} · {course.category}</p>
                        </div>
                        <span style={{ fontSize: 14, fontFamily: "var(--font-sans)", fontWeight: 500, color: pct === 100 ? "#0F6E56" : "var(--color-text-secondary)", flexShrink: 0, marginLeft: 12 }}>
                          {pct}%
                        </span>
                      </div>
                      <div style={{ height: 5, background: "var(--color-background-secondary)", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#1D9E75" : "#7F77DD", borderRadius: 4, transition: "width 0.5s ease" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-text-secondary)" }}>
                          {(progress[course.id] || []).length} / {course.lessons.length} lessons
                        </span>
                        <button onClick={() => { setActiveCourse(course); setView("course"); }} style={{
                          padding: "5px 14px", borderRadius: 8, fontSize: 13,
                          fontFamily: "var(--font-sans)", cursor: "pointer",
                          border: "0.5px solid var(--color-border-secondary)",
                          background: "transparent", color: "var(--color-text-primary)"
                        }}>{pct === 100 ? "Review" : "Continue →"}</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Stats */}
          {enrolledCourses.length > 0 && (
            <div style={{ marginTop: 40 }}>
              <h3 style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontSize: 20, fontWeight: 700, marginBottom: 16, color: "var(--color-text-primary)" }}>Your progress</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { label: "Courses enrolled", value: enrolledCourses.length },
                  { label: "Lessons completed", value: Object.values(progress).flat().length },
                  { label: "Courses completed", value: enrolledCourses.filter(c => getCourseProgress(c.id) === 100).length }
                ].map(s => (
                  <div key={s.label} style={{ background: "var(--color-background-secondary)", borderRadius: 10, padding: "16px 20px" }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
                    <p style={{ fontFamily: "'Georgia', serif", fontWeight: 700, fontSize: 28, margin: 0, color: "var(--color-text-primary)" }}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Course detail view */}
      {view === "course" && activeCourse && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px" }}>
          <button onClick={() => setView("browse")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontFamily: "var(--font-sans)", color: "var(--color-text-secondary)", marginBottom: 24, padding: 0 }}>← Back to courses</button>

          {/* Hero */}
          <div style={{ background: "var(--color-background-primary)", borderRadius: 16, border: "0.5px solid var(--color-border-tertiary)", padding: "32px 36px", marginBottom: 24 }}>
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ fontSize: 52, flexShrink: 0 }}>{activeCourse.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                  <span style={{ padding: "3px 12px", borderRadius: 20, fontSize: 12, fontFamily: "var(--font-sans)", background: "#EEEDFE", color: "#534AB7" }}>{activeCourse.category}</span>
                  <span style={{ padding: "3px 12px", borderRadius: 20, fontSize: 12, fontFamily: "var(--font-sans)", background: "var(--color-background-secondary)", color: "var(--color-text-secondary)" }}>{activeCourse.level}</span>
                </div>
                <h1 style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontSize: 28, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.2, color: "var(--color-text-primary)" }}>{activeCourse.title}</h1>
                <p style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-secondary)", fontSize: 15, margin: "0 0 16px" }}>{activeCourse.description}</p>
                <div style={{ display: "flex", gap: 20, fontSize: 14, fontFamily: "var(--font-sans)", color: "var(--color-text-secondary)", flexWrap: "wrap", marginBottom: 20 }}>
                  <span>👤 {activeCourse.instructor}</span>
                  <span>⭐ {activeCourse.rating}</span>
                  <span>👥 {activeCourse.students.toLocaleString()} students</span>
                  <span>🕐 {activeCourse.duration}</span>
                  <span>📋 {activeCourse.lessons.length} lessons</span>
                </div>
                {enrollments[activeCourse.id] ? (
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                      <div style={{ flex: 1, height: 6, background: "var(--color-background-secondary)", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${getCourseProgress(activeCourse.id)}%`, background: "#7F77DD", borderRadius: 4, transition: "width 0.5s" }} />
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)", flexShrink: 0 }}>{getCourseProgress(activeCourse.id)}% complete</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#0F6E56", fontFamily: "var(--font-sans)" }}>✓ Enrolled</p>
                  </div>
                ) : (
                  <button onClick={() => enroll(activeCourse.id)} style={{
                    padding: "11px 28px", borderRadius: 10, fontSize: 15, fontFamily: "var(--font-sans)",
                    cursor: "pointer", border: "none", background: "#7F77DD", color: "#fff", fontWeight: 500, letterSpacing: "0.01em"
                  }}>Enroll for free</button>
                )}
              </div>
            </div>
          </div>

          {/* Lessons */}
          <h2 style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontSize: 20, fontWeight: 700, marginBottom: 14, color: "var(--color-text-primary)" }}>Curriculum</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {activeCourse.lessons.map((lesson, i) => {
              const done = (progress[activeCourse.id] || []).includes(lesson.id);
              const canStart = enrollments[activeCourse.id];
              return (
                <div key={lesson.id} style={{
                  background: "var(--color-background-primary)", borderRadius: 10,
                  border: `0.5px solid ${done ? "#9FE1CB" : "var(--color-border-tertiary)"}`,
                  padding: "14px 18px", display: "flex", alignItems: "center", gap: 14
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    background: done ? "#E1F5EE" : "var(--color-background-secondary)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontFamily: "var(--font-sans)", fontWeight: 500,
                    color: done ? "#0F6E56" : "var(--color-text-secondary)"
                  }}>{done ? "✓" : i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, margin: 0, color: "var(--color-text-primary)", fontWeight: done ? 400 : 400 }}>{lesson.title}</p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, margin: "2px 0 0", color: "var(--color-text-secondary)" }}>
                      {typeIcon[lesson.type]} {typeLabel[lesson.type]} · {lesson.duration}
                    </p>
                  </div>
                  {canStart && (
                    <button onClick={() => openLesson(activeCourse, lesson)} style={{
                      padding: "6px 16px", borderRadius: 8, fontSize: 13, fontFamily: "var(--font-sans)",
                      cursor: "pointer", border: "0.5px solid var(--color-border-secondary)",
                      background: done ? "var(--color-background-secondary)" : "transparent",
                      color: done ? "var(--color-text-secondary)" : "var(--color-text-primary)"
                    }}>{done ? "Replay" : "Start"}</button>
                  )}
                  {!canStart && (
                    <span style={{ fontSize: 18, color: "var(--color-text-secondary)" }}>🔒</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lesson view */}
      {view === "learn" && activeCourse && activeLesson && (
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px" }}>
          <button onClick={() => { clearInterval(timerRef.current); setView("course"); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontFamily: "var(--font-sans)", color: "var(--color-text-secondary)", marginBottom: 28, padding: 0 }}>← Back to course</button>

          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <span style={{ padding: "3px 12px", borderRadius: 20, fontSize: 12, fontFamily: "var(--font-sans)", background: "var(--color-background-secondary)", color: "var(--color-text-secondary)" }}>
              {typeIcon[activeLesson.type]} {typeLabel[activeLesson.type]}
            </span>
            <span style={{ padding: "3px 12px", borderRadius: 20, fontSize: 12, fontFamily: "var(--font-sans)", background: "var(--color-background-secondary)", color: "var(--color-text-secondary)" }}>
              {activeLesson.duration}
            </span>
          </div>

          <h1 style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontSize: 28, fontWeight: 700, margin: "0 0 6px", color: "var(--color-text-primary)" }}>{activeLesson.title}</h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 28px" }}>{activeCourse.title} · {activeCourse.instructor}</p>

          {/* Lesson content area */}
          <div style={{
            background: "var(--color-background-primary)", borderRadius: 14,
            border: "0.5px solid var(--color-border-tertiary)", overflow: "hidden", marginBottom: 24
          }}>
            <div style={{
              background: "#1a1a2e", minHeight: 260, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", padding: 32, position: "relative"
            }}>
              {activeLesson.type === "video" && (
                <>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>🎬</div>
                  {!lessonActive && !lessonDone && (
                    <button onClick={startLesson} style={{
                      width: 64, height: 64, borderRadius: "50%", background: "#7F77DD",
                      border: "none", cursor: "pointer", fontSize: 22, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center"
                    }}>▶</button>
                  )}
                  {lessonActive && (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 32, color: "#fff", fontFamily: "var(--font-mono)", marginBottom: 12, fontWeight: 300 }}>{formatTime(lessonTimer)}</div>
                      <div style={{ fontSize: 13, color: "#aaa", fontFamily: "var(--font-sans)" }}>Watching…</div>
                    </div>
                  )}
                  {lessonDone && <div style={{ fontSize: 48 }}>✅</div>}
                </>
              )}
              {activeLesson.type === "reading" && (
                <>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>📖</div>
                  {!lessonActive && !lessonDone && (
                    <button onClick={startLesson} style={{
                      padding: "10px 26px", borderRadius: 10, background: "#7F77DD",
                      border: "none", cursor: "pointer", fontSize: 15, color: "#fff", fontFamily: "var(--font-sans)"
                    }}>Start reading</button>
                  )}
                  {lessonActive && (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 32, color: "#fff", fontFamily: "var(--font-mono)", marginBottom: 12, fontWeight: 300 }}>{formatTime(lessonTimer)}</div>
                      <div style={{ fontSize: 13, color: "#aaa", fontFamily: "var(--font-sans)" }}>Reading…</div>
                    </div>
                  )}
                  {lessonDone && <div style={{ fontSize: 48 }}>✅</div>}
                </>
              )}
              {activeLesson.type === "exercise" && (
                <>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>⚡</div>
                  {!lessonActive && !lessonDone && (
                    <button onClick={startLesson} style={{
                      padding: "10px 26px", borderRadius: 10, background: "#D4537E",
                      border: "none", cursor: "pointer", fontSize: 15, color: "#fff", fontFamily: "var(--font-sans)"
                    }}>Begin exercise</button>
                  )}
                  {lessonActive && (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 32, color: "#fff", fontFamily: "var(--font-mono)", marginBottom: 12, fontWeight: 300 }}>{formatTime(lessonTimer)}</div>
                      <div style={{ fontSize: 13, color: "#aaa", fontFamily: "var(--font-sans)" }}>Working…</div>
                    </div>
                  )}
                  {lessonDone && <div style={{ fontSize: 48 }}>✅</div>}
                </>
              )}
            </div>
            <div style={{ padding: "20px 24px" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7, margin: 0 }}>
                {activeLesson.type === "video" && `This lesson walks you through "${activeLesson.title}" with concrete examples. Click play to simulate watching, then mark it complete.`}
                {activeLesson.type === "reading" && `This reading covers "${activeLesson.title}" in depth. Work through the material at your own pace.`}
                {activeLesson.type === "exercise" && `Put what you've learned into practice. Complete the exercise and mark it done when you're satisfied with your work.`}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
            <div>
              {!lessonDone ? (
                <button onClick={completeLesson} disabled={!lessonActive} style={{
                  padding: "11px 28px", borderRadius: 10, fontSize: 15, fontFamily: "var(--font-sans)",
                  cursor: lessonActive ? "pointer" : "not-allowed",
                  border: "none", background: lessonActive ? "#1D9E75" : "var(--color-background-secondary)",
                  color: lessonActive ? "#fff" : "var(--color-text-secondary)", fontWeight: 500,
                  transition: "all 0.2s"
                }}>Mark as complete</button>
              ) : (
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ fontSize: 14, color: "#0F6E56", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: 6 }}>✓ Lesson complete</span>
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {/* Prev / Next lesson */}
              {(() => {
                const idx = activeCourse.lessons.findIndex(l => l.id === activeLesson.id);
                const prev = activeCourse.lessons[idx - 1];
                const next = activeCourse.lessons[idx + 1];
                return <>
                  {prev && <button onClick={() => openLesson(activeCourse, prev)} style={{ padding: "8px 16px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "transparent", fontSize: 13, fontFamily: "var(--font-sans)", cursor: "pointer", color: "var(--color-text-primary)" }}>← Prev</button>}
                  {next && <button onClick={() => openLesson(activeCourse, next)} style={{ padding: "8px 16px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "transparent", fontSize: 13, fontFamily: "var(--font-sans)", cursor: "pointer", color: "var(--color-text-primary)" }}>Next →</button>}
                </>;
              })()}
            </div>
          </div>

          {/* Lesson progress sidebar strip */}
          <div style={{ marginTop: 32, background: "var(--color-background-primary)", borderRadius: 12, border: "0.5px solid var(--color-border-tertiary)", padding: "16px 20px" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>All lessons</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {activeCourse.lessons.map((l, i) => {
                const done = (progress[activeCourse.id] || []).includes(l.id);
                const active = l.id === activeLesson.id;
                return (
                  <div key={l.id} onClick={() => openLesson(activeCourse, l)} style={{
                    display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
                    padding: "6px 8px", borderRadius: 7,
                    background: active ? "var(--color-background-secondary)" : "transparent"
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                      background: done ? "#E1F5EE" : "var(--color-background-secondary)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, fontFamily: "var(--font-sans)", fontWeight: 500,
                      color: done ? "#0F6E56" : "var(--color-text-secondary)"
                    }}>{done ? "✓" : i + 1}</div>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)", fontWeight: active ? 500 : 400 }}>{l.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CourseCard({ course, enrolled, progress, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: "var(--color-background-primary)", borderRadius: 14,
      border: "0.5px solid var(--color-border-tertiary)",
      overflow: "hidden", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s"
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ height: 90, background: `${course.color}15`, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
        <span style={{ fontSize: 44 }}>{course.icon}</span>
      </div>
      <div style={{ padding: "16px 18px" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <span style={{ padding: "2px 10px", borderRadius: 20, fontSize: 11, fontFamily: "var(--font-sans)", background: "#EEEDFE", color: "#534AB7" }}>{course.category}</span>
          <span style={{ padding: "2px 10px", borderRadius: 20, fontSize: 11, fontFamily: "var(--font-sans)", background: "var(--color-background-secondary)", color: "var(--color-text-secondary)" }}>{course.level}</span>
        </div>
        <h3 style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontWeight: 700, fontSize: 16, margin: "0 0 4px", lineHeight: 1.3, color: "var(--color-text-primary)" }}>{course.title}</h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 10px" }}>{course.instructor}</p>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontFamily: "var(--font-sans)", color: "var(--color-text-secondary)", marginBottom: 12 }}>
          <span>⭐ {course.rating} · {course.students.toLocaleString()}</span>
          <span>🕐 {course.duration}</span>
        </div>
        {enrolled && (
          <div>
            <div style={{ height: 4, background: "var(--color-background-secondary)", borderRadius: 4, overflow: "hidden", marginBottom: 4 }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "#7F77DD", borderRadius: 4, transition: "width 0.5s" }} />
            </div>
            <span style={{ fontSize: 11, fontFamily: "var(--font-sans)", color: "var(--color-text-secondary)" }}>{progress}% complete</span>
          </div>
        )}
      </div>
    </div>
  );
}
