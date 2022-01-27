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
        reserve_pool,
        compound_pool,
        educator_fee,
        reserve_fee,
        compound_fee,
        fraxion_price,
        remainder_pool_fee,
        remainder_weekly_fee,
    } = data;

    const pool = parseFloat(main_pool.balance_current);
    const prenCrv = parseFloat(0);
    const poolPrenCrvTotal = sum(pool, prenCrv);

    const p3CrvCompounding = parseFloat(compound_pool.balance_current);
    const p3CrvCompoundingDifference = difference(p3CrvCompounding, compound_pool.balance_previous);

    const reservePool = parseFloat(reserve_pool.balance_current);
    const reservePool2 = parseFloat(17123.93);
    const reservePoolSum = sum(reservePool, reservePool2);
    const reservePoolDifference = difference(reservePoolSum, reserve_pool.balance_previous);

    const dailyProfit = difference(poolPrenCrvTotal, main_pool.balance_previous);
    const profPerUnit = quotient(dailyProfit, units);

    const reserve = percentage(profPerUnit, reserve_fee); // 45%
    const reserveSubTotal = product(units, reserve);

    const educator = percentage(profPerUnit, educator_fee); // 5%
    const educatorSubTotal = product(units, educator);

    const remainder = profPerUnit - educator - reserve;

    const compound = percentage(remainder, compound_fee); // 25%
    const weeklyCompound = product(units, compound);

    const remainderWeekly = percentage(remainder, remainder_weekly_fee); // 65%
    const remainderPool = percentage(remainder, remainder_pool_fee); // 10%
    const remainderSubTotal = sum(remainderWeekly, remainderPool);

    const unitValue = product(units, fraxion_price);
    const totalExpenses = compound + reserve + educator + remainderSubTotal;

    // totals
    const totalUnitExpenses = product(totalExpenses, units);
    const totalCompound = sum(compound_pool.balance_previous, weeklyCompound);
    const totalReserve = sum(compound_pool.balance_previous, reserveSubTotal);
    const totalDeposits = product(units, fraxion_price);
    const totalComp = totalCompound;
    const totalRequired = sum(totalDeposits, totalComp);
    const totalReal = poolPrenCrvTotal + totalCompound + totalReserve;
    const overOrShort = difference(totalRequired, totalReal);

    return {
        pool,
        prenCrv,
        poolPrenCrvTotal,
        p3CrvCompounding,
        p3CrvCompoundingDifference,
        reservePool,
        reservePool2,
        reservePoolSum,
        reservePoolDifference,
        dailyProfit,
        units,
        profPerUnit,
        compound,
        weeklyCompound,
        reserve,
        reserveSubTotal,
        remainder,
        educator,
        educatorSubTotal,
        remainderWeekly,
        remainderPool,
        remainderSubTotal,
        unitValue,
        totalExpenses,
        totalUnitExpenses,
        totalCompound,
        totalReserve,
        totalDeposits,
        totalComp,
        totalRequired,
        totalReal,
        overOrShort,
    };
}