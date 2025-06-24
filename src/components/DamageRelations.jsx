import { useEffect } from "react";

const DamageRelations = ({ damages }) => {
  useEffect(() => {
    const arrayDamage = damages.map((damage) => {
      separateObjectBetweenToAndFrom(damage);
    });

    // if (arrayDamage.length === 2) {
    // } else {
    //   postDamageValue(arrayDamage[0].from);
    // }
  }, []);

  const postDamageValue = (props) => {
    const result = Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName;

      const valuesOfKeyName = {
        double_damage: "2x",
        half_damage: "1/2x",
        no_damage: "0x",
      };
      // console.log(acc, [keyName, value])

      return (acc = {
        [keyName]: value.map((i) => ({
          damageValue: valuesOfKeyName[key],
          ...i,
        })),
        ...acc,
      });
    }, {});

    return result;
  };

  const separateObjectBetweenToAndFrom = (damage) => {
    const from = filterDamageRelations("_from", damage);
    const to = filterDamageRelations("_to", damage);
    return { from, to };
  };

  const filterDamageRelations = (valueFilter, damage) => {
    const result = Object.entries(damage)
      .filter(([keyName, value]) => {
        return keyName.includes(valueFilter);
      })
      .reduce((acc, [keyName, value]) => {
        const keyWithValueFilterRemove = keyName.replace(valueFilter, "");

        return (acc = { [keyWithValueFilterRemove]: value, ...acc });
      }, {});

    return result;
  };

  return <div>DamageRelations</div>;
};

export default DamageRelations;
