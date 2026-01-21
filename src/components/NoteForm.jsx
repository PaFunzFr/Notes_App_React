import React from 'react'
import {useState} from 'react';

const NoteForm = ({notes, setNotes}) => {

    const [formData, setFormData] = useState({
        title: '',
        priority: 'Medium',
        category: 'Work',
        description: ''
    })

    const [isFormVisible, setIsFormVisible] = useState(true);

    const handleChange = (e) =>  {
        // extend current formdata values (...formdate) with target values
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation
        if (!formData.title || !formData.description) return;

        // Create not object
        const newNote = {id: Date.now(), ...formData}

        // Add notes to state
        setNotes([newNote, ...notes]);

        // Reset form data
        setFormData({
            title: '',
            category: 'Work',
            priority: 'Medium',
            description: ''
        })
    }

    return (
        <>
        {/* Toggle Button */}
        <button
            className="w-full bg-gray-100 border border-gray-300 text-purple-800 py-2 rounded-lg cursor-pointer hover:bg-purple-200 hover: border-purple-300 transition: mb-4"
            onClick={() => setIsFormVisible(!isFormVisible)}    
        >
            {isFormVisible ? 'Hide Form' : 'Add New Note'}
        </button>
        { isFormVisible && (
            <form onSubmit={handleSubmit} action="" className="mb-6">
                <div className="mb-4">
                    <label htmlFor="title" className="block font-semibold">
                        Title
                    </label>
                    <input
                        name="title"
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="priority" className="block font-semibold">
                        Priority
                    </label>
                    <select
                        name="priority"
                        className="w-full p-2 border rounded-lg"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="High">🔴 High</option>
                        <option value="Medium">🟡 Medium</option>
                        <option value="Low">🟢 Low</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block font-semibold">
                        Category
                    </label>
                    <select
                        name="category"
                        className="w-full p-2 border rounded-lg"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Ideas">Ideas</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block font-semibold">
                        Description
                    </label>
                    <textarea
                        name="description"
                        className="w-full p-2 border rounded-lg"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button
                    className="w-full bg-purple-500 text-white py-2 rounded-lg cursor-pointer hover: bg-purple-600"
                    type="submit"
                    disabled={!formData.title || !formData.description}
                >
                    Add Note
                </button>
            </form>
        )}
        </>
    )
}

export default NoteForm