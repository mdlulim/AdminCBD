export function debounce(fn, delay) {
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, arguments), delay);
    };
}

/**
 * Fraxion Calculations
 */
export function calcTotal(val1, val2) {
    return parseFloat(val1) + parseFloat(val2);
}

export function difference(current, previous) {
    return parseFloat(current) - parseFloat(previous);
}

export function quotient(val1, val2) {
    return parseFloat(val1) / parseFloat(val2);
}

export function sum(val1, val2) {
    return parseFloat(val1) + parseFloat(val2);
}

export function product(val1, val2) {
    return parseFloat(val1) * parseFloat(val2);
}

export function percentage(val1, perc) {
    return parseFloat(val1) * parseFloat(perc) / 100;
}

export function fraxionCalculations(data) {
    const {
        units,
        main_pool,
        compound_pool,
        educator_fee,
        reserve_fee,
        compound_fee,
        fraxion_price,
        remainder_pool_fee,
        remainder_weekly_fee,
    } = data;

    const pool = parseFloat(main_pool.balance_current);
    const prencrv = parseFloat(0);
    const pool_prencrv_total = sum(pool, prencrv);

    const p3crv_compounding = parseFloat(compound_pool.balance_current);
    const p3crv_compounding_difference = difference(p3crv_compounding, compound_pool.balance_previous);

    const reserve_pool = parseFloat(data.reserve_pool.balance_current);
    const reserve_pool2 = parseFloat(data.reserve_pool.other);
    const reserve_pool_total = sum(reserve_pool, reserve_pool2);
    const reserve_pool_difference = difference(reserve_pool_total, data.reserve_pool.total_previous);

    const daily_profit = difference(pool_prencrv_total, main_pool.balance_previous);
    const profit_per_unit = quotient(daily_profit, units);

    const reserve = percentage(profit_per_unit, reserve_fee); // 45%
    const reserve_subtotal = product(units, reserve);

    const educator = percentage(profit_per_unit, educator_fee); // 5%
    const educator_subtotal = product(units, educator);

    const remainder = profit_per_unit - educator - reserve;

    const compound = percentage(remainder, compound_fee); // 25%
    const weekly_compound = product(units, compound);

    const remainder_weekly = percentage(remainder, remainder_weekly_fee); // 65%
    const remainder_pool = percentage(remainder, remainder_pool_fee); // 10%
    const remainder_subtotal = sum(remainder_weekly, remainder_pool);

    const unit_value = product(units, fraxion_price);
    const total_expenses = compound + reserve + remainder_subtotal;

    // totals
    const total_unit_expenses = product(total_expenses, units);
    const total_compound = sum(compound_pool.total_previous, weekly_compound);
    const total_reserve = sum(compound_pool.balance_previous, reserve_subtotal);
    const total_deposits = product(units, fraxion_price);
    const totalComp = total_compound;
    const total_required = sum(total_deposits, totalComp);
    const total_real = pool_prencrv_total + total_compound + total_reserve;
    const over_short = difference(total_real, total_required);

    return {
        pool,
        prencrv,
        pool_prencrv_total,
        p3crv_compounding,
        p3crv_compounding_difference,
        reserve_pool,
        reserve_pool2,
        reserve_pool_total,
        reserve_pool_difference,
        daily_profit,
        units,
        profit_per_unit,
        compound,
        weekly_compound,
        reserve,
        reserve_subtotal,
        remainder,
        educator,
        educator_subtotal,
        remainder_weekly,
        remainder_pool,
        remainder_subtotal,
        unit_value,
        total_expenses,
        total_unit_expenses,
        total_compound,
        total_reserve,
        total_deposits,
        totalComp,
        total_required,
        total_real,
        over_short,
    };
}