export interface TestAllgemein {
    testfrage: Testfrage[];
}

export interface Testfrage {
    question: string;
    answers:   Answer[];
    images:   string[];
    number:   number;
}

export interface Answer {
    answer:     string;
    valid: boolean;
}

export interface TestState{
    correct: number;
    incorrect: number;
    remaining: number;
}