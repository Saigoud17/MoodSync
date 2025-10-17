import React from "react";
import "./about.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import image from "../../IMG/blank-profile.png";
import Footer from "../Footer";
import prashanthImg from "../../IMG/my_pic.jpeg";
import abigna from "../../IMG/abigna.jpg";
import harini from "../../IMG/harini2.jpg";
import aaditya from "../../IMG/aditya.jpg";
import saigoud from "../../IMG/sai.jpg";

const teamMembers = [{
        name: "A Prashanth",
        role: "Full Stack Developer",
        image: prashanthImg,
        github: "https://github.com/Aousulaprashant",
        linkedin: "https://www.linkedin.com/in/prashanth-aousula-161b19224/",
    },
    {
        name: "B Sai Kiran Goud",
        role: "Full Stack Developer",
        image: saigoud,
        github: "https://github.com/Saigoud17",
        linkedin: "https://www.linkedin.com/in/sai-kiran-goud-bathini-bb165325a/",
    },
    {
        name: "M Harini",
        role: "Frontend Developer",
        image: harini,

    }
];

const guild = {
    name: "Laxman Babu",
    image: image,
    role: "Mentor & Guide",
};

const projectInfo = {
    name: "Project Name",
    description: "This project is a cutting-edge platform designed to streamline collaboration and efficiency. Our team has worked hard to create a user-friendly experience, integrating modern technologies to deliver a seamless and intuitive interface.",
    technologies: ["React.js", "Node.js", "Express.js", "CSS"],
    githubRepo: "https://github.com/Aousulaprashant/MoodSync",

};

const About = () => {
    return ( <
        div className = "about-container" >
        <
        div className = "project-info" >
        <
        h1 className = "project-title" > { projectInfo.name } < /h1> <
        p className = "project-description" > { projectInfo.description } < /p> <
        h3 className = "project-tech-title" > Technologies Used: < /h3> <
        ul className = "tech-list" > {
            projectInfo.technologies.map((tech, index) => ( <
                li key = { index }
                className = "tech-item" > { tech } <
                /li>
            ))
        } <
        /ul> <
        p className = "college-info" >
        <
        strong >
        <
        span > Major Project < /span> | {projectInfo.college} < /
        strong > <
        /p> <
        a href = { projectInfo.githubRepo }
        target = "_blank"
        rel = "noopener noreferrer"
        className = "project-link" >
        View on GitHub <
        /a> < /
        div >

        { /* Guild Section */ } <
        h1 className = "about-title" > Meet Our Team < /h1> <
        div className = "guild-section" >
        <
        img src = { guild.image }
        alt = { guild.name }
        className = "guild-image" / >
        <
        h2 className = "guild-name" > { guild.name } < /h2> <
        p className = "guild-role" > { guild.role } < /p> < /
        div >

        { /* Team Members Section */ } <
        div className = "team-grid" > {
            teamMembers.map((member, index) => ( <
                div key = { index }
                className = "team-card" >
                <
                img src = { member.image }
                alt = { member.name }
                className = "team-image" /
                >
                <
                h3 className = "team-name" > { member.name } < /h3> <
                p className = "team-role" > { member.role } < /p> <
                div className = "social-links" >
                <
                a href = { member.github }
                target = "_blank"
                rel = "noopener noreferrer" >
                <
                FaGithub className = "fab fa-github" / >
                <
                /a> <
                a href = { member.linkedin }
                target = "_blank"
                rel = "noopener noreferrer" >
                <
                FaLinkedin className = "fab fa-linkedin" / >
                <
                /a> < /
                div > <
                /div>
            ))
        } <
        /div>

        <
        Footer / >
        <
        /div>
    );
};

export default About;