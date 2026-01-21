import React from 'react'
import {useState} from 'react';
import TextInput from './inputs/TextInput';
import SelectInput from './inputs/SelectInput';
import TextareaInput from './inputs/TextareaInput';

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
                <TextInput 
                    label='title'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <SelectInput
                    label="Priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    options = {[
                        {value: 'High', label: '🔴 High'},
                        {value: 'Medium', label: '🟡 Medium'},
                        {value: 'Low', label: '🟢 Low'},
                    ]}
                />
                <SelectInput
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    options = {[
                        {value: 'Work', label: 'Work'},
                        {value: 'Personal', label: 'Personal'},
                        {value: 'Ideas', label: 'Ideas'},
                    ]}
                />
                <TextareaInput
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

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