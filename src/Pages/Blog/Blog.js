import React from 'react';
import useTittle from '../../hooks/useTittle';

const Blog = () => {
  useTittle("Blog")
  return (
    <div className='px-10'>
      <h2 className='font-semibold text-2xl my-5'>Better Programming</h2>
      <div className='divider'></div>

      <div className='space-y-3'>

        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <div className="collapse-title text-xl font-medium">
            <h2 className='text-xl font-semibold'>What are the different ways to manage a state in a React application?</h2>
          </div>
          <div className="collapse-content space-y-2">
            <h2 className="font-semibold text-lg">The Four Kinds of React State to Manage</h2>
            <p>There are four main types of state you need to properly manage in your React apps:</p>
            <li>Local state</li>
            <li>Global state</li>
            <li>Server state</li>
            <li>URL state</li>
          </div>
        </div>

        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <div className="collapse-title text-xl font-medium">
            <h2 className='text-xl font-semibold'>How does prototypical inheritance work?</h2>
          </div>
          <div className="collapse-content  space-y-2">
            <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object</p>
            <p>Each object has a private property which holds a link to another object called its prototype.</p>
          </div>
        </div>

        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <div className="collapse-title text-xl font-medium">
            <h2 className='text-xl font-semibold'>What is a unit test? Why should we write unit tests?</h2>
          </div>
          <div className="collapse-content space-y-2">
            <p><span className="text-semibold">Unit Testing</span> is a type of software testing where individual units or components of a software are tested. The purpose is to validate that each unit of the software code performs as expected. Unit Testing is done during the development (coding phase) of an application by the developers. Unit Tests isolate a section of code and verify its correctness. A unit may be an individual function, method, procedure, module, or object.</p>
            <p>A unit test is a way of testing a unit - the smallest piece of code that can be logically isolated in a system. In most programming languages, that is a function, a subroutine, a method or property. The isolated part of the definition is important.</p>
          </div>
        </div>

        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <div className="collapse-title text-xl font-medium">
            <h2 className='text-xl font-semibold' > React vs. Angular vs. Vue?</h2>
          </div>
          <div className="collapse-content">
            <div className='space-y-4'>
              <div className='space-y-2'>
                <li className='text-2xl'>React</li>
                <p>React can be used as a UI library to render elements, without enforcing a specific project structure, and that’s why it’s not strictly a framework.</p>
                <p>React Elements are the smallest building blocks of React apps. They are more powerful than DOM elements because the React DOM makes sure to update them efficiently whenever something changes.</p>
                <p>Components are larger building blocks that define independent and reusable pieces to be used throughout the application. They accept inputs called props and produce elements that are then displayed to the user.</p>
              </div>
              <div className='space-y-2'>
                <li className='text-2xl'>Angular</li>
                <p>In this article, I’m discussing Angular 2, and not the first version of the framework which is now known as AngularJS.</p>
                <p>AngularJS, the original framework, is an MVC (Model-View-Controller) framework. But in Angular 2, there’s no strict association with MV*-patterns as it is also component-based.</p>
                <p>Projects in Angular are structured into Modules, Components, and Services. Each Angular application has at least one root component and one root module.</p>
              </div>
              <div className='space-y-2'>
                <li className='text-2xl'>Vue</li>
                <p>The Vue.js core library focuses on the View layer only. It’s called a progressive framework because you can extend its functionality with official and third-party packages, such as Vue Router or Vuex, to turn it into an actual framework.</p>
                <p>Although Vue is not strictly associated with the MVVM (Model-View-ViewModel) pattern, its design was partly inspired by it. With Vue, you’ll be working mostly on the ViewModel layer, to make sure that the application data is processed in a way that allows the framework to render an up-to-date View.</p>
                <p>Vue’s templating syntax lets you create View components, and it combines familiar HTML with special directives and features. This templating syntax is preferred, even though raw JavaScript and JSX are also supported.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Blog;