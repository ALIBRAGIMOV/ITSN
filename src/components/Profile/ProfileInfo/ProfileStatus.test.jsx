import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="Messier 81" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("Messier 81");
    });
});

describe("After creation <span> should be displayed with correct status", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="Messier 81" />);
        const root = component.root;
        let span = root.findByType("span")
        expect(span).not.toBeNull();
    });
});

describe("After creation <input> shouldn't be displayed", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="Messier 81" />);
        const root = component.root;
        expect(()=>{
            let input = root.findByType("input")
        }).toThrow();
    });
});

describe("After creation <input> shouldn't be displayed", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="Messier 81" />);
        const root = component.root;
        let span = root.findByType("span")
        expect(span.children[0]).toBe("Messier 81");
    });

    test("input should be displayed edit mode instead of span", () => {
        const component = create(<ProfileStatus status="Messier 81" />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick()
        let input = root.findByType("input");
        expect(input.props.value).toBe("Messier 81");
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status="Messier 81" updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});