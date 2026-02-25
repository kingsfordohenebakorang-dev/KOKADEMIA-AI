export interface SyllabusTopic {
    id: string;
    title: string;
    weight: number; // 0-100
    level: 'Core' | 'Advanced' | 'Niche';
    discipline: 'Actuarial' | 'Mathematics' | 'Statistics';
    formulas: string[];
}

export const MOCK_SYLLABUS: SyllabusTopic[] = [
    // ─── Actuarial Science ───
    {
        id: 'act-1',
        title: 'Time Value of Money',
        weight: 15,
        level: 'Core',
        discipline: 'Actuarial',
        formulas: ['v = (1+i)^{-1}', 'd = iv', 'a_{\\\\overline{n}|} = (1-v^n)/i']
    },
    {
        id: 'act-2',
        title: 'Survival Models',
        weight: 25,
        level: 'Core',
        discipline: 'Actuarial',
        formulas: ['{}_tp_x = e^{-\\\\int_0^t \\\\mu_{x+s} ds}', 'e_x = \\\\int_0^\\\\omega {}_tp_x dt']
    },
    {
        id: 'act-3',
        title: 'Life Insurance',
        weight: 20,
        level: 'Advanced',
        discipline: 'Actuarial',
        formulas: ['A_x = \\\\int_0^\\\\infty v^t {}_tp_x \\\\mu_{x+t} dt']
    },
    {
        id: 'act-4',
        title: 'Annuities',
        weight: 30,
        level: 'Advanced',
        discipline: 'Actuarial',
        formulas: ['\\\\ddot{a}_x = \\\\sum_{k=0}^\\\\infty v^k {}_kp_x']
    },
    {
        id: 'act-5',
        title: 'Premium Calculation',
        weight: 10,
        level: 'Niche',
        discipline: 'Actuarial',
        formulas: ['P = \\\\frac{A_x}{\\\\ddot{a}_x}']
    },

    // ─── Calculus ───
    {
        id: 'math-1',
        title: 'Limits & Continuity',
        weight: 10,
        level: 'Core',
        discipline: 'Mathematics',
        formulas: ['\\\\lim_{x \\\\to a} f(x) = L', '\\\\epsilon\\\\text{-}\\\\delta \\\\text{ definition}']
    },
    {
        id: 'math-2',
        title: 'Differentiation',
        weight: 20,
        level: 'Core',
        discipline: 'Mathematics',
        formulas: ['\\\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\\\cdot g\'(x)', '\\\\frac{d}{dx}[x^n] = nx^{n-1}']
    },
    {
        id: 'math-3',
        title: 'Integration',
        weight: 25,
        level: 'Core',
        discipline: 'Mathematics',
        formulas: ['\\\\int_a^b f(x)\\\\,dx = F(b) - F(a)', '\\\\int u\\\\,dv = uv - \\\\int v\\\\,du']
    },
    {
        id: 'math-4',
        title: 'Multivariable Calculus',
        weight: 15,
        level: 'Advanced',
        discipline: 'Mathematics',
        formulas: ['\\\\nabla f = \\\\left(\\\\frac{\\\\partial f}{\\\\partial x}, \\\\frac{\\\\partial f}{\\\\partial y}\\\\right)', '\\\\iint_R f(x,y)\\\\,dA']
    },

    // ─── Linear Algebra ───
    {
        id: 'math-5',
        title: 'Linear Algebra & Matrices',
        weight: 20,
        level: 'Core',
        discipline: 'Mathematics',
        formulas: ['\\\\det(A - \\\\lambda I) = 0', 'Ax = b', 'A^{-1} = \\\\frac{1}{\\\\det(A)} \\\\text{adj}(A)']
    },

    // ─── Differential Equations ───
    {
        id: 'math-6',
        title: 'Differential Equations',
        weight: 20,
        level: 'Advanced',
        discipline: 'Mathematics',
        formulas: ['\\\\frac{dy}{dx} + P(x)y = Q(x)', 'y = e^{-\\\\int P\\\\,dx} \\\\left( \\\\int Q e^{\\\\int P\\\\,dx}\\\\,dx + C \\\\right)']
    },

    // ─── Real Analysis ───
    {
        id: 'math-7',
        title: 'Real Analysis & Proofs',
        weight: 15,
        level: 'Advanced',
        discipline: 'Mathematics',
        formulas: ['\\\\forall \\\\epsilon > 0, \\\\exists \\\\delta > 0', '\\\\sum_{n=1}^\\\\infty a_n \\\\text{ converges}']
    },

    // ─── Statistics ───
    {
        id: 'stat-1',
        title: 'Probability Distributions',
        weight: 25,
        level: 'Core',
        discipline: 'Statistics',
        formulas: ['E[X] = \\\\int x f(x)\\\\,dx', 'Var(X) = E[X^2] - (E[X])^2']
    },
    {
        id: 'stat-2',
        title: 'Estimation & Hypothesis Testing',
        weight: 20,
        level: 'Advanced',
        discipline: 'Statistics',
        formulas: ['\\\\hat{\\\\theta}_{MLE} = \\\\arg\\\\max L(\\\\theta)', 'Z = \\\\frac{\\\\bar{X} - \\\\mu}{\\\\sigma/\\\\sqrt{n}}']
    }
];

export interface ExamProfile {
    id: string;
    name: string;
    discipline: 'Actuarial' | 'Mathematics' | 'Statistics';
    question_style: 'Theoretical' | 'Computational' | 'Mixed';
    avg_marks: number;
}
