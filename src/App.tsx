import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { cn } from "./utils/cn";

type Todo = {
    id: string;
    title: string;
    completed: boolean;
};

export const App = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState("");

    const handleAddTodo = () => {
        if (title.trim()) {
            setTodos([...todos, { id: uuidv4(), title, completed: false }]);
            setTitle("");
        }
    };

    const handleToggleTodo = (id: string) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-6 background-img">
            <div className="max-w-[900px] mx-auto">
                <div className="bg-gray-900/50 backdrop-blur-md shadow-xl rounded-xl p-6 border border-gray-700">
                    <h1 className="text-3xl font-bold text-center text-white mb-6">
                        📝 Todoアプリ
                    </h1>

                    <div className="flex gap-2 mb-6">
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="新しいタスクを入力..."
                            aria-label="新しいタスクを入力"
                            className={cn(
                                "flex-1 px-4 py-2 border border-gray-300 rounded-lg placeholder-white",
                                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            )}
                        />
                        <button
                            type="submit"
                            onClick={handleAddTodo}
                            className="add-btn"
                        >
                            追加
                        </button>
                    </div>

                    {todos.length === 0 ? (
                        <div className="text-center text-white py-8">
                            <p className="text-lg">タスクがありません</p>
                            <p className="text-sm">
                                新しいタスクを追加してください
                            </p>
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {todos.map((todo) => (
                                <li
                                    key={todo.id}
                                    className={cn(
                                        "flex items-center gap-3 p-3 rounded-lg border transition-all duration-300",
                                        todo.completed
                                            ? "border-gray-200"
                                            : "border-gray-300 hover:border-blue-300"
                                    )}
                                >
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() =>
                                            handleToggleTodo(todo.id)
                                        }
                                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <span
                                        className={`flex-1 ${
                                            todo.completed
                                                ? "line-through text-gray-500"
                                                : "text-white"
                                        }`}
                                    >
                                        {todo.title}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {todos.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <p className="text-sm text-white text-center">
                                完了済み:{" "}
                                {todos.filter((todo) => todo.completed).length}{" "}
                                / {todos.length}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
